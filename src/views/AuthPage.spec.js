import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import component from './AuthPage.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/store/myUser.js'

import VueCookies from 'vue-cookies'
import { createApp } from 'vue'
import { setActivePinia, createPinia } from 'pinia'

import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'


describe('AuthPage component', () => {
    const mockRoute = {
        params: {
            id: 1
        }
    }
    const mockRouter = {
        push: vi.fn()
    }
    
    // beforeEach(() => {
    //     const app = createApp(component)
    //     const pinia = createPinia().use(VueCookies)
    //     app.use(pinia)
    //     setActivePinia(pinia)
    // })
    const buildWrapper = (stubActions = false) => {
        return mount(component, {
            global: {
                plugins: [createTestingPinia({ stubActions })],
                mocks: {
                    route: mockRoute,
                    router: mockRouter
                }
            },
        })
    }
    
    it('mounts without error', () => {
        const wrapper = buildWrapper()
        expect(wrapper.exists).toBeTruthy()
    })
    it('check fild', async () => {
        const wrapper = buildWrapper()
        const store = useUserStore()
        console.log('auth__input', wrapper.find('.auth__input'))
    })
})
