import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/:QTnotebook',
      component: () => import('../views/PagesView.vue')
    },
    {
      path: '/:QTnotebook/:QTpage',
      component: () => import('../views/CanvasViewerView.vue')
    }
  ]
})

export default router
