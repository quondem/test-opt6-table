<template>
	<input
		v-if="total"
		@input="$emit('change', $e)"
		:value="total"
		class="input field"
		type="number"
		:disabled="disabled"
	/>
	<input
		v-else
		@input="$emit('change', $e)"
		v-model="model"
		class="input field"
		type="number"
		:disabled="disabled"
	/>
</template>

<script setup>
	const model = defineModel();
	const { disabled, total } = defineProps(["disabled", "total"]);
	const emit = defineEmits(["change"]);
</script>

<style lang="scss">
	.input {
		position: relative;
		padding: 10px 5px 10px 15px;
		border-radius: 5px;
		border: solid 1px #ccc;
		outline: none;
	}
</style>
