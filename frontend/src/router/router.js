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
    name: 'Write',
    component: () => import('@/pages/BoardWrite'),
  },
  {
    path: '/board/board',
    component: () => import('@/pages/Board/Board'),
  },
  {
    path: '/search',
    component: () => import('@/pages/Search'),
  },
  {
    path: '/search/result',
    name: 'SearchResult',
    component: () => import('@/pages/SearchResult'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
