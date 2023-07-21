import { createWebHistory, createRouter } from 'vue-router';
import { useLoginStore } from '@/stores/isLogin';
import { useModalStore } from '@/stores/modal';

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
    beforeEnter: (to, from, next) => {
      checkLogin(to, from, next);
    },
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

const checkLogin = (to, from, next) => {
  const loginStore = useLoginStore();
  const modalStore = useModalStore();
  const isLogin = loginStore.isLogin;
  if (!isLogin) {
    alert('로그인이 필요한 페이지입니다.');
    modalStore.openModal('modalLogin');
  } else {
    next();
  }
};

export default router;
