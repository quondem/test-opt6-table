<template>
	<div
		ref="drag"
		class="drag field">
		<img
			src="@assets/images/drag.svg"
			alt="drag" />
		<span>
			{{ index + 1 }}
		</span>
		<div class="dragging"></div>
	</div>
</template>

<script setup>
	import { ref } from "vue";

	let props = defineProps(["index"]);

	let drag = ref(null);
</script>

<style lang="scss">
	.drag {
		justify-content: center;
		align-items: center;
		gap: 5px;
		cursor: pointer;
		& img {
			pointer-events: none;
			user-select: none;
		}
	}
	@media (max-width: 768px) {
		.drag {
			height: auto !important;
			justify-content: start;
		}
	}
</style>
