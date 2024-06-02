<template>
	<button
		@click="showOptionsHandler($event)"
		class="options field"
		:class="`options_${index}`"
	>
		<img
			src="/images/options.png"
			alt="options"
			ref="refOptions"
		/>
		<Teleport to="#app">
			<Transition name="fade">
				<button
					@click="$emit('delete')"
					v-if="showDrop"
					class="options__drop"
					:style="optionsPosition"
				>
					Удалить
				</button>
			</Transition>
		</Teleport>
	</button>
</template>

<script setup>
	import { ref, reactive } from "vue";

	const index = Math.ceil(Math.random() * new Date().getTime());

	const bodyClick = e => {
		if (!e.target.closest(`.options_${index}`)) {
			showDrop.value = false;
			document.querySelector("body").removeEventListener("pointerdown", bodyClick);
		}
	};

	const showDrop = ref(false);
	const refOptions = ref(null);

	const optionsPosition = reactive({ top: 0, left: 0 });
	const showOptionsHandler = e => {
		const position = refOptions.value.getBoundingClientRect();
		console.log(position);
		optionsPosition.top = position.top + position.height + 5 + "px";
		optionsPosition.left = position.left + "px";
		showDrop.value = !showDrop.value;
		document.querySelector("body").addEventListener("pointerdown", bodyClick);
	};
</script>

<style lang="scss">
	.options {
		position: relative;
		padding: 7px;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 2px;
		cursor: pointer;
		background-color: transparent;
		border: none;
		& img {
			width: 3px;
			height: 13px;
		}
		&__drop {
			position: absolute;
			background-color: transparent;
			border: none;
			padding: 7px 10px;
			cursor: pointer;
			box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
			background-color: #fff;
			border-radius: 5px;
			width: 180px;
			text-align: left;
			z-index: 10;
			font-size: 14px;
			color: #ae0a0a;
		}
	}
	@media (max-width: 768px) {
		.options {
			align-items: start;
			padding: 0;
			height: auto !important;
		}
	}
</style>
