import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router'
const router = createRouter({
  history: createWebHistory(),
  routes
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('路由from', from)
  const token = sessionStorage.getItem('news-html-token')
  if (token) {
    if (to.path === '/login') {
      next('/home') // 如果已登录，且目标页面是登录页，则重定向到 home 页
    } else {
      next() // 如果已登录，正常跳转
    }
  } else {
    if (to.path === '/login') {
      next() // 如果未登录，但目标页面是登录页，则正常跳转
    } else {
      next('/login') // 如果未登录，且目标页面不是登录页，则重定向到登录页
    }
  }
})
// 全局后置钩子
router.afterEach(() => {})
export default router
