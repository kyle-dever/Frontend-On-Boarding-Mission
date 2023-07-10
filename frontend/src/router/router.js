import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('@/pages/Home'),
    },
    {
        path: '/mypage',
        component: () => import('@/pages/MyPage'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;