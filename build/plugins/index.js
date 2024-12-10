import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unplugin from './unplugin' // unplugin自动导入
import compression from './compression' // 资源压缩
import inspect from './inspect' // vue插件检查页面
import legacy from './legacy' // 浏览器兼容
import vueDevTools from './vueDevtool' // vue开发工具
import restartPlugin from './restart' // 重启服务
import htmlPlugin from './html' // html插件
import svgIconPlugin from './svgIcon' // svg图标集成
import versionUpdatePlugin from './versionUpdatePlugin' // 版本更新插件

/**
 * @description  创建vite插件
 * @param viteEnv - 环境变量配置
 * @param isBuild - 是否编译
 */
export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue(), vueJsx(), ...unplugin(), restartPlugin(), svgIconPlugin()]
  if (isBuild) {
    vitePlugins.push(
      compression(),
      legacy(),
      htmlPlugin(),
      versionUpdatePlugin({
        version: new Date().getTime() // 定义一个时间戳
      })
    )
  } else {
    vitePlugins.push(inspect(), vueDevTools(viteEnv))
  }
  return vitePlugins
}
