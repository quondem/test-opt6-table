<template>
	<RouterLink
		:to
		class="link"
		:class="{ link_active: active }"
	>
		{{ text }}
	</RouterLink>
</template>

<script setup>
	import { RouterLink } from "vue-router";

	const props = defineProps(["text", "active", "to"]);
</script>

<style lang="scss" scoped>
	.link {
		font-weight: 600;
		text-decoration: none;
	}
	.router-link-active {
		color: var(--light-navy);
	}
</style>
