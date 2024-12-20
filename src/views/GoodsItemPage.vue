<template>
    <div class="wrapper">
        <the-header>
			<template #title>Страница товара</template> 
			<template #undefined>&nbsp; </template> 
		</the-header>
        <main class="main">
            <div class="main__content _container">
                <post-item
                    v-if="post"
                    :post="post"
                    :key="post.id"
                    @click-bye="cartStore.addToCartList"
                />
                <span v-else>Товар не найден</span>
            </div>
        </main>
    </div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import PostItem from '@/components/PostItem.vue'
import { computed } from 'vue'
import { useGoodsStore } from '@/store/goods'
const goodsStore = useGoodsStore()
import { useCartStore } from '@/store/cart'
const cartStore = useCartStore()

const props = defineProps(['id'])

const post = computed(() => {
    return goodsStore.goodsList.find((item) => {
        return item.id === +props.id
    })
})
</script>

<style lang="scss" scoped></style>
