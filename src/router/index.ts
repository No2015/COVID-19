import { createRouter, createWebHashHistory, Router } from 'vue-router';
import Index from '../pages/Index.vue'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: '',
      path: '/',
      redirect: '/index'
    },
    {
      name: 'index',
      path: '/index',
      component: Index
    },
  ]
});

export default router;
