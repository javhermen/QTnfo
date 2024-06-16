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
      path: '/settings',
      name: 'settings',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/new_notebook',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:QTnotebook/new_page',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:QTnotebook',
      component: () => import('../views/PagesView.vue')
    },
    {
      path: '/:notebook/:page',
      component: () => import('../views/CanvasViewerView.vue')
    },
    {
      path: '/vier',
      name: 'canvas',
      component: () => import('../views/CanvasViewerView.vue')
    },
    {
      path: '/phone',
      name: 'phone',
      component: () => import('../views/PhoneView.vue')
    }
  ]
})

export default router
