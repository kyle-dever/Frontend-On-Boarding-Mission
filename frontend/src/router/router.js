import { createWebHistory, createRouter } from "vue-router";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;