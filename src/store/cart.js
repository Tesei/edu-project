import { defineStore } from 'pinia'
import { reactive, computed, ref } from 'vue'
import { useGoodsStore } from '@/store/goods'
const goodsStore = useGoodsStore()
import axios from 'axios'

export const useCartStore = defineStore(
    'cart',
    () => {
        const cartList = reactive({})
        // const cartItems = computed(() => {
        // 	const result = []
        // 	Object.entries(cartList).forEach((arr) => {
        // 		let place = goodsStore.goods.filter((item) => item.title === arr[0])[0]
        // 		if (typeof place === 'object') result.push(place)
        // 	})
        // 	return result
        // })

        function addToCartList(item) {
            if (cartList[item.title]) cartList[item.title]++
            else cartList[item.title] = 1
        }
        function removeFromCartList(item) {
            if (cartList[item.title] && cartList[item.title] > 1) cartList[item.title]--
            else if (cartList[item.title] && cartList[item.title] <= 1) delete cartList[item.title]
            else return
        }

        function cleanItemFromBucket(item) {
            delete cartList[item.title]
        }
        function cleanBucket() {
            Object.keys(cartList).forEach((key) => delete cartList[key])
            hasDelivery.value = false
        }

        const getCountOfGoodsNames = computed(() => {
            return Object.keys(cartList).length
        })

        const getCountOfGoodsItems = computed(() => {
            return Object.entries(cartList).reduce((acc, value) => acc + value[1], 0)
        })

        const getTotalSumOfGoods = computed(() => {
            return Object.entries(cartList).reduce((acc, value) => {
                let priceItem = goodsStore.goods.find((item) => item.title === value[0])?.price
                if (typeof priceItem === 'string') priceItem = +priceItem.replace(/[^0-9.]/gim, '')
                return priceItem * value[1] + acc
            }, 0)
        })
        const getTotalSumOfGoodsAndService = computed(() => {
            return hasDelivery.value ? getTotalSumOfGoods.value + 1000 : getTotalSumOfGoods.value
        })

        const hasDelivery = ref(false)
        function changeDelivery() {
            hasDelivery.value = !hasDelivery.value
        }

        const showClientForm = ref(false)
        function changeVisibleClientForm() {
            showClientForm.value = !showClientForm.value
        }

        async function sendBuyForm(form) {
            try {
                let res = await axios.get('https://httpbin.org/', {
                    timeout: 4000,
                    data: form,
                })
                if (res.status >= 200 && res.status < 300) return 'success'
                else throw new Error('bad status')
            } catch {
                console.error('Ошибка в методе sendBuyForm')
            }
        }

        return {
            addToCartList,
            cartList,
            removeFromCartList,
            getCountOfGoodsNames,
            getCountOfGoodsItems,
            getTotalSumOfGoods,
            cleanBucket,
            cleanItemFromBucket,
            changeDelivery,
            hasDelivery,
            getTotalSumOfGoodsAndService,
            showClientForm,
            changeVisibleClientForm,
            sendBuyForm,
        }
    },
    { persist: true },
)
