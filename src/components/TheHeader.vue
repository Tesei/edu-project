<template>
	<header class="header">
		<div class="header__content _container">
			<div class="header__row">
				<slot name="undefined">
					<div class="header__column">
						<h1 class="header__title">Добавление товара</h1>
					</div>

					<div class="header__column">
						<!-- Создание поисковой строки -->
						<my-input
							v-model="searchQueryChild"
							:placeHolder="searchPlaceholder"
							:req="false"
							class="header__search"
						>
						</my-input>
					</div>

					<div class="header__column">
						<my-select
							v-model="selectedSortChild"
							:options="sortOptions"
							class="header__select"
						/>
					</div>
				</slot>
				<the-bucket
					class="header__column"
					@click="router.push({ name: 'cartPage' })"
				/>
			</div>
		</div>
	</header>
</template>

<script setup>
	import { ref } from 'vue'
	import TheBucket from '@/components/TheBucket.vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()

	const searchPlaceholder = 'Поиск ...'

	const searchQueryChild = ref('')
	const selectedSortChild = ref('')

	const sortOptions = [
		{ value: 'title', name: 'По названию' },
		{ value: 'body', name: 'По содержанию' },
		{ value: 'price-from-min', name: 'По цене min' },
		{ value: 'price-from-max', name: 'По цене max' },
	]
</script>

<style lang="scss" scoped>
	.header {
		margin: 31px 0px 16px 0px;

		// .header__content
		&__content {
		}

		// .header__row
		&__row {
			display: flex;
			flex-wrap: wrap;
			margin-right: -10px;
			margin-left: -10px;

			@media (min-width: $md3) {
				justify-content: space-between;
				align-items: center;
				flex-direction: row;
			}
		}

		// .header__column
		&__column {
			align-self: flex-start;
			margin-bottom: 15px;
			margin-right: 10px;
			margin-left: 10px;

			@media (max-width: $md3) {
				flex: 1 1 auto;

				&:last-child {
					margin-bottom: 0;
				}
			}

			@media (max-width: 600px) {
				&:first-child {
					order: 3;
					margin-bottom: 0;
				}

				&:last-child {
					margin-bottom: 15px;
				}
			}
		}

		// .header__title
		&__title {
			display: inline-block;
			font-style: normal;
			font-weight: 600;
			font-size: 28px;
			line-height: 35px;
			color: #3f3f3f;
			flex: 1 0 auto;
		}

		// .header__select
		&__select {
			flex: 0 1 30%;
		}

		// .header__search
		&__search {
			min-width: 250px;
			margin-top: -14px !important;

			@media (max-width: $md2) {
				min-width: 200px;
				margin: 0;
				margin-top: -14px;
				width: 100%;
			}
		}
	}
</style>
