import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomePage.vue'),
        },
        {
            path: '/cart',
            name: 'cartPage',
            component: () => import('@/views/CartPage.vue'),
        },

    ],
})

export default router
