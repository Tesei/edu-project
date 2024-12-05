<template>
	<div class="wrapper">
		<header-wrapper />

		<main class="main">
			<div class="main__content _container">
				<bucket-two-column />
			</div>
		</main>
		<footer class="footer">
			<div class="footer__content _container">
			</div>
		</footer>
	</div>
</template>

<script setup>
import BucketTwoColumn from '@/components/BucketTwoColumn.vue'
import HeaderWrapper from '@/components/HeaderWrapper.vue'
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
