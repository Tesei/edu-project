import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import component from './PostList.vue'
import PostItem from '@/components/PostItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCartStore } from '@/store/cart.js'

import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'

describe('PostList component', () => {
    
    const buildWrapper = (stubActions = true) => {
        return mount(component, {
            props: {
                goodsList: [
                    {
                        "id": 1,
                        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                        "price": 1009.95,
                        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                        "category": "men's clothing",
                        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                        "rating": {
                            "rate": 3.9,
                            "count": 120
                        }
                    },
                    {
                        "id": 2,
                        "title": "some goods item",
                        "price": 100123129.95,
                        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                        "category": "men's clothing",
                        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                        "rating": {
                            "rate": 3.9,
                            "count": 120
                        }
                    }
                ],
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
    it('Проверка наличия компонента PostItem', () => {
        const wrapper = buildWrapper()
        const cardOfGoods= wrapper.findComponent(PostItem)
        expect(cardOfGoods.exists()).toBe(true)
    })

    it('Проверка, что считаются товары по количеству', async () => {
        const wrapper = buildWrapper(false)
        const store = useCartStore()  
        const btn = wrapper.find('.card__btn')
        await btn.trigger('click')
        await btn.trigger('click')
        await btn.trigger('click')

        await flushPromises() 
        await waitForExpect(() => {
            expect(store.addToCartList).toHaveBeenCalledTimes(3)            
            expect(store.getCartList['Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops']).toEqual(3)
            expect(store.getCountOfGoodsItems).toEqual(3)
        })
    })

    it('Проверка, что считаются товары по типам и количеству', async () => {
        const wrapper = buildWrapper(false)
        const store = useCartStore()  
        const btn = wrapper.findAll('.card__btn')        
        await btn[0].trigger('click')
        await btn[1].trigger('click')
        await btn[1].trigger('click')

        await flushPromises() 
        await waitForExpect(() => {
            expect(store.addToCartList).toHaveBeenCalledTimes(3)
            expect(store.getCartList['Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops']).toEqual(1)
            expect(store.getCartList['some goods item']).toEqual(2)
            expect(store.getCountOfGoodsItems).toEqual(3)
            expect(store.getCountOfGoodsNames).toEqual(2)
        })
    })
})
