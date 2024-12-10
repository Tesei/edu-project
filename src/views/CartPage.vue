<template>
	<div class="wrapper">
		<the-header><template #undefined>&nbsp; </template> </the-header>
		<main class="main">
			<div class="main__content _container">
				<bucket-two-column />
			</div>
		</main>
		<footer class="footer">
			<div class="footer__content _container"></div>
		</footer>
	</div>
	<my-wrapper-popup
		class="goods__form-buy"
		v-if="showForm"
		@close="cartStore.changeVisibleClientForm"
	>
		<template #header> Форма данных клиента </template>
		<template #default>
			<buy-form></buy-form>
		</template>
	</my-wrapper-popup>
</template>

<script setup>
import MyWrapperPopup from '@/components/UI/MyWrapperPopup.vue'
import BuyForm from '@/components/BuyForm.vue'
import BucketTwoColumn from '@/components/BucketTwoColumn.vue'
import TheHeader from '@/components/TheHeader.vue'
import { useCartStore } from '@/store/cart'
const cartStore = useCartStore()
import { computed } from 'vue'

const showForm = computed(() => cartStore.showClientForm)
</script>

<style scoped lang="scss">
	.wrapper {
	}

	.main {
		margin-bottom: 95px;

		// .main__content
		&__content {
		}
	}

	.footer {
		// .footer__content
		&__content {
			margin-bottom: 100px;
		}

		// .footer__top
		&__top {
			margin-bottom: 60px;
		}

		// .footer__title
		&__title {
			font-size: 3rem;
			font-style: normal;
			font-weight: 600;
			line-height: 1.2;
		}

		// .footer__bottom
		&__bottom {
		}
	}
</style>
