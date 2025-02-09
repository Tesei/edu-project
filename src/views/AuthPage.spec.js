import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'
import { useUserStore } from '@/store/myUser.js'
import component from './AuthPage.vue'
import { useRouter, useRoute } from 'vue-router'

vi.mock('vue-router', () => ({
    useRoute: vi.fn(),
    useRouter: vi.fn(() => ({
        push: () => {},
    })),
}))

describe('AuthPage component', () => {
    // ? stubActions указывает будут ли создаваться полноценные сущности стора
    const buildWrapper = (stubActions = false) => {
        return mount(component, {
            global: {
                stubs: ['router-link', 'router-view'], // Stubs for router-link and router-view in case they're rendered in your template
                plugins: [createTestingPinia({ stubActions })],
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

    // Пример тестирования с замоканым роутом
    it('redirect an correct goods page', async () => {
        //   useRoute.mockImplementationOnce(() => ({
        //     params: {
        //       id: 1
        //     }
        //   }))
        const push = vi.fn()
        useRouter.mockImplementationOnce(() => ({
            push,
        }))

        const wrapper = buildWrapper(true)
        const store = useUserStore() // ? должно стоять после wrapper
        store.userAuthorized = true

        const loginInput = wrapper.find('input[name="name"]')
        const passwordInput = wrapper.find('input[name="password"]')

        await loginInput.setValue('1')
        await passwordInput.setValue('1')
        await wrapper.get('form').trigger('submit') // working !

        await flushPromises()
        await waitForExpect(() => {
            expect(push).toHaveBeenCalledTimes(1)
            expect(push).toHaveBeenCalledWith({ name: 'goods' })
        })
    })
})
