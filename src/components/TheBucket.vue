<template>
	<div class="info-bucket">
		<div class="info-bucket__row">
			<div class="info-bucket__image-wrap">
				<img
					src="@/assets/images/icons/bucket3.svg"
					alt="корзина товаров"
					class="info-bucket__image"
				/>
			</div>
			<div class="info-bucket__text">
				<h4 class="info-bucket__title">Ваша корзина</h4>
				<span class="info-bucket__amount-of-goods"> Количество наименований: {{ cartStore.getCountOfGoodsNames }} </span>
				<span class="info-bucket__summ-of-goods text">Общее количество: {{ cartStore.getCountOfGoodsItems }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useCartStore } from '@/store/cart'
const cartStore = useCartStore()
</script>

<style scoped lang="scss">


	.info-bucket {
		cursor: pointer;
		// .info-bucket__row
		&__row {
			display: flex;
			height: 100%;
			margin-right: 2px;
		}

		// .info-bucket__image-wrap
		&__image-wrap {
			min-height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		// .info-bucket__image
		&__image {
			margin: 10px;
			width: 32px;
			height: 32px;
		}

		// .info-bucket__text
		&__text {
		}

		// .info-bucket__title
		&__title {
			display: block;
			line-height: 1.2;
			font-size: 1.4rem;
		}

		// .info-bucket__amount-of-goods
		&__amount-of-goods {
			color: $gray-txt;
			display: block;
			line-height: 1.2;
			font-size: 1.2rem;
		}

		// .info-bucket__summ-of-goods
		&__summ-of-goods {
			font-size: 1.2rem;
		}
	}
</style>
