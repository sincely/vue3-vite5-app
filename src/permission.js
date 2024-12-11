import router from '@/router'
import axios from 'axios'
// 全局前置守卫
router.beforeEach((to, from, next) => {
  versionCheck() // 版本监控
  next()
})

// 版本监控 全局缓存的版本 与 版本号文件读取结果 不同时，说明有新版本，5秒后自动刷新
// 解决重复刷新问题

const versionCheck = async () => {
  console.log('当前版本：', __APP_VERSION__)
  console.log('当前环境：', import.meta.env)
  if (import.meta.env.VITE_NODE_ENV === 'development') return
  const response = await axios.get('version.json')
  console.log('最新版本：', response.data.version)
  if (__APP_VERSION__ !== response.data.version) {
    // console.log('有新版本，刷新页面');
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
}
