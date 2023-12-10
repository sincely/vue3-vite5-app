import { createRouter, createWebHashHistory } from 'vue-router'
import layouts from '@/layouts/index.vue'
import home from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: layouts,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: home,
          name: 'home',
          meta: {
            title: '首页',
            keepAlive: true
          }
        }
      ]
    }
  ]
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
