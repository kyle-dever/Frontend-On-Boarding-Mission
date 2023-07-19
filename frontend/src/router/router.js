import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Home'),
  },
  {
    path: '/board/machine',
    component: () => import('@/pages/Machine'),
  },
  {
    path: '/board/data',
    component: () => import('@/pages/DataAnalysis'),
  },
  {
    path: '/board/AI',
    component: () => import('@/pages/AI'),
  },
  {
    path: '/board/write',
    component: () => import('@/pages/BoardWrite'),
  },
  {
    path: '/board/board',
    name: 'Board',
    component: () => import('@/pages/Board/Board'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
