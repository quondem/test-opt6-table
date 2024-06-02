<template>
	<aside
		class="sidebar"
		:class="{ active: isOpen }"
	>
		<div class="sidebar__wrapper">
			<button
				@click="closeSidebar"
				class="sidebar__close"
			>
				<img
					src="/images/close.svg"
					alt="close"
				/>
			</button>
		</div>
	</aside>
</template>

<script setup>
	import { computed, ref } from "vue";
	import { useStore } from "vuex";

	const store = useStore();

	const isOpen = computed(() => store.getters["getIsOpen"]);
	const closeSidebar = () => store.commit("setOpenSidebar", false);
</script>
<style lang="scss">
	.sidebar {
		max-width: 229px;
		width: 100%;
		height: auto;
		flex-grow: 1;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
		background: radial-gradient(circle at 29% 0, #000, #1c2734 103%);
		&__close {
			display: none;
		}
	}
	@media (max-width: 992px) {
		.sidebar {
			transform: translateX(-100%);
			transition: 0.5s;
			&__wrapper {
				width: 100%;
				height: 100%;
				position: relative;
			}
			&__close {
				display: block;
				position: absolute;
				width: 40px;
				height: 40px;
				padding: 4px;
				top: 15px;
				right: 15px;
				background-color: transparent;
				border: none;
				cursor: pointer;
				& img {
					width: 100%;
					height: 100%;
				}
			}
			&.active {
				transform: translateX(0);
				max-width: 100%;
				height: 100%;
			}
		}
	}
</style>
