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
			:for="id"
		>
			<slot></slot>
		</label>
	</div>
</template>

<script setup>
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

</style>
