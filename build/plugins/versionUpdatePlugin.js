// versionUpdatePlugin.js
const writeVersion = async (versionFile, content) => {
  const fs = await import('fs').then((module) => module.default)
  // 写入文件
  fs.writeFile(versionFile, content, (err) => {
    if (err) throw err
  })
}

export default (options) => {
  let config = null
  return {
    name: 'version-update',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    },
    async buildStart() {
      const fs = await import('fs').then((module) => module.default)
      const path = await import('path').then((module) => module.default)
      // 生成版本信息文件路径
      const file = config.publicDir + path.sep + 'version.json'
      // 这里使用编译时间作为版本信息
      const content = JSON.stringify({ version: options.version })
      console.log('编译时间', content)
      if (fs.existsSync(config.publicDir)) {
        writeVersion(file, content)
      } else {
        fs.mkdir(config.publicDir, (err) => {
          if (err) throw err
          writeVersion(file, content)
        })
      }
    }
  }
}
