<template>
	<div class="drop">
		<div
			@click="showColumns = !showColumns"
			class="drop__title"
		>
			<span>{{ title }}</span>
			<img
				src="@assets/images/arrow.svg"
				alt="arrow"
			/>
		</div>
		<div
			v-if="showColumns"
			class="columns"
		>
			<slot />
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";

	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
	});
	const showColumns = ref(false);
</script>

<style lang="scss" scoped></style>
