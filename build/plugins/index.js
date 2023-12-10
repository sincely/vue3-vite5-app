import vue from '@vitejs/plugin-vue'
import unplugin from './unplugin' // unplugin自动导入
import mock from './mock' // mock
import compression from './compression' // 资源压缩
import inspect from './inspect' // vue插件检查页面
import legacy from './legacy' // 浏览器兼容
import progress from './progress' // 页面进度条
import vueDevTools from './vueDevtool' // vue开发工具
import prefetchPlugin from './preload' // 预加载
import webUpdateNoticePlugin from './updateVersion' // 版本更新
import restartPlugin from './restart' // 重启服务
import htmlPlugin from './html' // html插件
import svgIconPlugin from './svgIcon' // svg图标集成
/**
 * @description  创建vite插件
 * @param viteEnv - 环境变量配置
 * @param isBuild - 是否编译
 */
export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue(), mock(viteEnv), ...unplugin(), restartPlugin(), svgIconPlugin()]
  if (isBuild) {
    vitePlugins.push(compression(), legacy(), progress(), webUpdateNoticePlugin(), htmlPlugin())
  } else {
    vitePlugins.push(
      inspect(),
      vueDevTools(viteEnv),
      prefetchPlugin({
        pathList: ['./src/views/', './src/components/'],
        preFix: ''
      })
    )
  }
  return vitePlugins
}
