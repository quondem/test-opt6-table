<template>
	<h2 class="title">{{ text }}</h2>
</template>
<script setup>
	let props = defineProps(["text"]);
</script>
<style>
	.title {
		line-height: 1;
		font-size: 30px;
	}
</style>
