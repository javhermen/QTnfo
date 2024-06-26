import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/RouterView.vue'),
      children: [
        {
          path: '/',
          component: () => import('../components/QTnotebooks/QTnotebooksContainer.vue')
        },
        {
          path: '/:QTnotebook',
          component: () => import('../components/QTpages/QTpagesContainer.vue')
        },
        {
          path: '/:QTnotebook/:QTpage',
          component: () => import('../components/QTcanvas/QTcanvas.vue')
        }
      ]
    }
  ]
})

export default router
