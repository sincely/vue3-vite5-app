import router from '@/router'
import axios from 'axios'
// 全局前置守卫
router.beforeEach((to, from, next) => {
  versionCheck() // 版本监控
  next()
})

// 版本监控
const versionCheck = async () => {
  const response = await axios.get('version.json')
  if (import.meta.env.VITE_NODE_ENV === 'development') return
  if (__APP_VERSION__ !== response.data.version) {
    // console.log('有新版本，刷新页面');
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
}
