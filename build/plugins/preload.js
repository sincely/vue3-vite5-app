import fs from 'fs'
/**
 * @description  获取文件
 * @param {*}  文件路径
 * @returns {*}
 */
function getFiles(e) {
  const arr = []
  const dirents = fs.readdirSync(e, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      arr.push(...getFiles(e + dirent.name + '/'))
    } else {
      arr.push(e + dirent.name)
    }
  }
  return arr
}
// 插入加载文件脚本
/**
 * @description 插入预加载加载文件脚本
 * @export setPreLoadFile
 * @param  pathList 需要提前加载的资源目录
 * @param  preFix 项目根路径
 * @returns {*}
 */
export default function prefetchPlugin(options = { pathList: [], preFix: '' }) {
  if (options.pathList && options.pathList.length) {
    const res = options.pathList.map(getFiles).flat()
    const linkStr = `
        <script>
        setTimeout(() => {
            function preLoadSource(url){
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        console.log('预加载成功');
                    } else {
                        console.error('预加载失败');
                    }
                };
                xhr.send();
            }\n
        ${res.map((item) => `preLoadSource('${options.preFix + item.substring(1)}')\n`).join('')}
        })\n</script>
    `
    return {
      name: 'preload-file',
      transformIndexHtml(dom) {
        return dom.replace('</body>', `${linkStr}</body>`)
      }
    }
  }
}
