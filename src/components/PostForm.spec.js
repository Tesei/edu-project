import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import component from './PostForm.vue'
import { createTestingPinia } from '@pinia/testing'
import { useGoodsStore } from '@/store/goods.js'

import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'

describe('PostForm component', () => {
    const buildWrapper = (stubActions = true) => {
        return mount(component, {
            global: {
                plugins: [createTestingPinia({ stubActions })],
            },
        })
    }

    it('mounts without error', () => {
        const wrapper = buildWrapper()
        expect(wrapper.exists).toBeTruthy()
    })
    it('Test the vee-validate check', async () => {
        const wrapper = buildWrapper()
        await wrapper.get('.aside__form').trigger('submit')
        await flushPromises()
        await waitForExpect(() => {
            expect(wrapper.html()).toContain('form__error')
        })
    })
    it('enter full data without input-errors', async () => {
        const wrapper = buildWrapper()
        await wrapper.find('[data-testid="title"]').find('input').setValue('TestEnter')
        await wrapper
            .find('[data-testid="image-link"]')
            .find('input')
            .setValue('https://tesei.github.io/sites/mockUp\'s/polaroid.jpg')
        await wrapper.find('[data-testid="price"]').find('input').setValue('10000')
        await wrapper.get('.aside__form').trigger('submit')
        await flushPromises()
        await waitForExpect(() => {            
            expect(wrapper.html()).not.toContain('form__error')
        })
    })
    it('added new goods for store', async () => {
        const wrapper = buildWrapper(false)
        const store = useGoodsStore()
        await wrapper.find('[data-testid="title"]').find('input').setValue('TestEnter')
        await wrapper
            .find('[data-testid="image-link"]')
            .find('input')
            .setValue('https://tesei.github.io/sites/mockUp\'s/polaroid.jpg')
        await wrapper.find('[data-testid="price"]').find('input').setValue('10000')
        await wrapper.get('.aside__form').trigger('submit')
        await flushPromises()        
        await waitForExpect(() => {
            expect(store.createPost).toHaveBeenCalledTimes(1)
        })
    })
})
