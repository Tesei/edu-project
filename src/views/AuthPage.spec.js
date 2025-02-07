import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'
import { useUserStore } from '@/store/myUser.js'
import component from './AuthPage.vue'

import { routes } from '@/router'
import { createRouter, createWebHistory } from 'vue-router'

// import { useRouter } from 'vue-router'
// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: '/goods', name: 'goods', component: () => import('@/views/HomePage.vue') },
//     ],
// })

describe('AuthPage component', () => {
    const router = createRouter({
        history: createWebHistory(),
        routes: routes,
    })
    beforeEach(async () => {
        router.push('/')
        await router.isReady()
    })

    // vi.mock('vue-router')
    // const pushReplacement = vi.fn()
    // useRouter.mockImplementation(() => ({
    //     name: pushReplacement,
    // }))
    // const mockRouter = {
    //     push: vi.fn()
    // }
    // ? stubActions указывает будут ли создаваться полноценные сущности стора
    const buildWrapper = (stubActions = false) => {
        return mount(component, {
            global: {
                plugins: [createTestingPinia({ stubActions }), router],
                // mocks: mockRouter, // Mock router if needed
            },
        })
    }

    it('mounts without error', () => {
        const wrapper = buildWrapper()
        expect(wrapper.exists).toBeTruthy()
    })
    it('displays error when fields are empty', async () => {
        const wrapper = buildWrapper()
        const loginInput = wrapper.find('input[name="name"]')
        const passwordInput = wrapper.find('input[name="password"]')

        await loginInput.setValue('')
        await passwordInput.setValue('')
        await wrapper.get('form').trigger('submit') // ? working !
        
        await flushPromises()
        await waitForExpect(() => {
            expect(wrapper.find('.form__error')).toBeTruthy()
        })
    })

    it('check routs', async () => {
        const wrapper = buildWrapper(true)
        // const store = useUserStore() // ? должно стоять после wrapper
        const loginInput = wrapper.find('input[name="name"]')
        const passwordInput = wrapper.find('input[name="password"]')
        
        await loginInput.setValue('1')
        await passwordInput.setValue('1')
        await wrapper.get('form').trigger('submit') // working !
        
        await flushPromises()
        await waitForExpect(() => {
            // expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
            expect(router.push).toHaveBeenCalledTimes(1)
            // expect(router.push).toHaveBeenCalledWith( {"name":"goods","params":{}})
        })
    })
})

        // it('calls fetchLogIn with correct arguments when fields are filled', async () => {
        //     const wrapper = buildWrapper(true)
        //     const store = useUserStore() // ? должно стоять после wrapper
        //     const loginInput = wrapper.find('input[name="name"]')
        //     const passwordInput = wrapper.find('input[name="password"]')
    
        //     await loginInput.setValue('1')
        //     await passwordInput.setValue('1')
        //     await wrapper.get('form').trigger('submit') // working !
    
        //     await flushPromises()
        //     await waitForExpect(() => {
        //         expect(store.fetchLogIn).toHaveBeenCalledTimes(1)
        //         expect(store.fetchLogIn).toHaveBeenCalledWith({ login: '1', password: '1' })
        //         // expect($router.push).toHaveBeenCalledTimes(1)
        //         // expect(router.push).toHaveBeenCalledWith({ name: 'goods' })
        //     })
        // })