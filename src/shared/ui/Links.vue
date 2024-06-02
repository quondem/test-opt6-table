<template>
	<div class="links__wrapper">
		<div class="links">
			<Link
				to="all"
				text="Общее"
				:active="true"
			/>
			<Link
				to="/"
				text="Товары"
			/>
			<Link
				to="expenses"
				text="Доп. расходы"
				:active="true"
			/>
		</div>
		<Gear />
	</div>
</template>

<script setup>
	import Link from "./Link.vue";
	import Gear from "@ui/gear/Gear.vue";
</script>

<style lang="scss" scoped>
	.links {
		display: flex;
		gap: 20px;
		&__wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 15px;
		}
	}
</style>
