<template>
	<div class="my-checkbox">
		<input
			:id="id"
			v-model="isChecked"
			type="checkbox"
			class="my-checkbox__input"
		/>
		<label
			class="my-checkbox__label"
            :class="{ '_red': error }"
			:for="id"
		>
			<slot></slot>
		</label>
	</div>
</template>

<script setup>
const props = defineProps(['error'])
const id = Math.random()
const isChecked = defineModel()
</script>

<style lang="scss" scoped>
.my-checkbox {
    display: flex;

// .my-checkbox__input
&__input {
    margin-right: 10px;
}

// .my-checkbox__label
&__label {
}
}
._red{
    color: $red;
}
</style>
