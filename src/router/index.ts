import { createRouter, createWebHashHistory, Router } from 'vue-router';
import Index from '../pages/Index.vue'
import List from '../pages/List.vue'

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
    {
      name: 'list',
      path: '/list',
      component: List
    },
  ]
});

export default router;
