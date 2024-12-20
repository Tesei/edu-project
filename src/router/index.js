import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'auth',
            component: () => import('@/views/AuthPage.vue'),
            meta: { canEnterUnauthorized: true },
        },
        {
            path: '/goods',
            name: 'goods',
            component: () => import('@/views/HomePage.vue'),
        },
        {
            path: '/cart',
            name: 'cartPage',
            component: () => import('@/views/CartPage.vue'),
        },
        {
            path: '/item/:id',
            props: true,
            name: 'itemPage',
            component: () => import('@/views/GoodsItemPage.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@/views/404Page.vue'),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
})
router.beforeEach((to, from, next) => {
    if (!VueCookies.get('authToken') && !to.meta.canEnterUnauthorized) next({ name: 'auth' })
    return next()
})
export default router
