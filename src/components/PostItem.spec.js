import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import component from './PostItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCartStore } from '@/store/cart.js'

import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'

describe('PostItem component', () => {
    
    const buildWrapper = (stubActions = true) => {
        return mount(component, {
            props: {
                post: {
                    'id': 1,
                    'title': 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
                    'price': 1009.95,
                    'description': 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
                    'category': 'men\'s clothing',
                    'image': 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
                    'rating': {
                        'rate': 3.9,
                        'count': 120
                    }
                },
            },
            global: {
                plugins: [createTestingPinia({ stubActions })],
            },
        })
    }

    it('mounts without error', () => {
        const wrapper = buildWrapper()
        expect(wrapper.exists).toBeTruthy()
        expect(wrapper.html()).toMatchSnapshot()
    })
    it('start btn text', () => {
        const wrapper = buildWrapper()
        expect(wrapper.find('.card__btn').text()).toEqual('В корзину')
    })
    it('price text has a space', () => {
        const wrapper = buildWrapper()
        const price = 1009.95.toLocaleString('ru-RU') + ' руб.'
        expect(wrapper.find('.card__price').text()) === price
    })
    it('emit called', async () => {
        const wrapper = buildWrapper()
        const btn = wrapper.find('.card__btn')
        await btn.trigger('click')
        await btn.trigger('click')
        await btn.trigger('click')
        expect(wrapper.emitted()['click-bye']).toHaveLength(3)
    })
    it('function addToCartList been called', async () => {
        const wrapper = buildWrapper(false)
        const store = useCartStore()     
        await store.addToCartList(wrapper.props().post)
        await flushPromises() 
        await waitForExpect(() => {
            expect(store.addToCartList).toHaveBeenCalledTimes(1)
        })
    })
})
