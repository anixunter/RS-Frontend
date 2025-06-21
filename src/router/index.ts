import { createRouter, createWebHistory } from 'vue-router';
import authChildren from './authChildren';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'authLayout',
      component: () => import('@/layouts/AuthLayout.vue'),
      meta: {
        requireAuth: true,
      },
      children: authChildren,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/Login.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/404.vue'),
    },
  ],
});

export default router;
