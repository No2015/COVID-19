import { createRouter, createWebHashHistory, Router } from 'vue-router';
import Index from '../pages/Index.vue'
import List from '../pages/List.vue'
import Analysis from '../pages/Analysis.vue'

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
    {
      name: 'analysis',
      path: '/analysis',
      component: Analysis
    },
  ]
});

export default router;
