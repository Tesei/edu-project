import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useGoodsStore = defineStore(
    'goods',
    () => {
        const goods = ref([])
        const goodsList = computed(() => goods.value)
        const defaultGoods = ref([
            {
                id: 1,
                image: 'https://tesei.github.io/sites/mockUp\'s/polaroid.jpg',
                title: 'Наименование товара',
                description:
                    '3 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                price: '10 000',
            },
            {
                id: 2,
                image: 'https://tesei.github.io/sites/mockUp\'s/polaroid.jpg',
                title: 'Наименование товара 2',
                description:
                    '2 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                price: '12 000',
            },
            {
                id: 3,
                image: 'https://tesei.github.io/sites/mockUp\'s/polaroid.jpg',
                title: 'Наименование товара 3',
                description:
                    '1 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                price: '13 000',
            },
            {
                id: 4,
                image: 'https://tesei.github.io/sites/mockUp\'s/polaroid.jpg',
                title: 'Наименование товара 4',
                description:
                    '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                price: '14 000',
            },
            {
                id: 5,
                image: 'https://tesei.github.io/sites/mockUp\'s/polaroid.jpg',
                title: 'Наименование товара 5',
                description:
                    '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                price: '14 000',
            },
            {
                id: 6,
                image: 'https://tesei.github.io/sites/mockUp\'s/polaroid.jpg',
                title: 'Наименование товара 6',
                description:
                    '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                price: '14 000',
            },
            {
                id: 7,
                image: 'https://tesei.github.io/sites/mockUp\'s/polaroid.jpg',
                title: 'Наименование товара 7',
                description:
                    '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                price: '14 000',
            },
            {
                id: 8,
                image: 'https://tesei.github.io/sites/mockUp\'s/polaroid.jpg',
                title: 'Наименование товара 7',
                description:
                    '4 Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                price: '14 000',
            },
        ])
        const defaultImageLink = 'https://tesei.github.io/sites/mockUp\'s/polaroid.jpg'

        // Actions
        const fetchGoodsFromFakestore = async () => {
            try {
                let { data } = await axios.get('https://fakestoreapi.com/products', {
                    timeout: 5000,
                })
                //         {
                //     "id": 1,
                //     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                //     "price": 109.95,
                //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                //     "category": "men's clothing",
                //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                //     "rating": {
                //         "rate": 3.9,
                //         "count": 120
                //     }
                // },
                goods.value = data
            } catch {
                console.warn('Устанавливаем массив дефолтных товаров')
                goods.value = defaultGoods.value
            }
        }

        function createPost(item) {
            goods.value.push(item)
        }
        function removePost(item) {
            goods.value = item.filter((p) => p.id !== goods.value.id)
        }

        return {
            fetchGoodsFromFakestore,
            defaultGoods,
            goods,
            defaultImageLink,
            createPost,
            removePost,
            goodsList,
            persist: true,
        }
    },
    { persist: true },
)
