import { defineStore } from 'pinia'
import { reactive, computed, ref } from 'vue'
import { useGoodsStore } from '@/store/goods'
const goodsStore = useGoodsStore()
import axios from 'axios'

export const useCartStore = defineStore(
    'cart',
    () => {
        const cartList = ref({})
        const getCartList = computed(() => cartList.value)

        function addToCartList(item) {
            if (cartList.value[item.title]) cartList.value[item.title]++
            else cartList.value[item.title] = 1
        }
        function removeFromCartList(item) {
            if (cartList.value[item.title] && cartList.value[item.title] > 1) cartList.value[item.title]--
            else if (cartList.value[item.title] && cartList.value[item.title] <= 1) delete cartList.value[item.title]
            else return
        }

        function cleanItemFromBucket(item) {
            delete cartList.value[item.title]
        }
        function cleanBucket() {
            Object.keys(cartList.value).forEach((key) => delete cartList.value[key])
            hasDelivery.value = false
        }

        const getCountOfGoodsNames = computed(() => {
            return Object.keys(cartList.value).length
        })

        const getCountOfGoodsItems = computed(() => {
            return Object.entries(cartList.value).reduce((acc, value) => acc + value[1], 0)
        })

        const getTotalSumOfGoods = computed(() => {
            return Object.entries(cartList.value).reduce((acc, value) => {
                let priceItem = goodsStore.goods.find((item) => item.title === value[0])?.price
                if (typeof priceItem === 'string') priceItem = priceItem.replace(/[^0-9.]/gim, '')
                return +priceItem * value[1] + acc
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

        const savedCartLists = reactive([])
        function saveUserData(userId) {
            const data = {
                id: userId,
                cartList: { ...cartList.value },
            }
            savedCartLists.push(data)
            cleanBucket()
        }
        function loadSavedUserData(userId) {
            let newData = savedCartLists.find((user) => user.id === userId)
            if (newData) cartList.value = { ...newData.cartList }
        }

        return {
            addToCartList,
            getCartList,
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
            saveUserData,
            loadSavedUserData,
            savedCartLists,
            cartList,
        }
    },
    { persist: true },
)
