import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
	const cartList = reactive({})
	function addToCartList(item) {
		if (cartList[item.title]) cartList[item.title]++
		else cartList[item.title] = 1
	}
	function removeFromCartList(item) {
		if (cartList[item] && cartList[item] > 1) cartList[item]--
		else if (cartList[item] && cartList[item] === 1) delete cartList[item]
		else return
	}

	// Getters
	const getCountOfGoodsNames = computed(() => {
		return Object.keys(cartList).length
	})

	const getCountOfGoodsItems = computed(() => {
		return Object.entries(cartList).reduce((acc, value) => acc + value[1], 0)
	})

	return { addToCartList, cartList, removeFromCartList, getCountOfGoodsNames, getCountOfGoodsItems }
})
