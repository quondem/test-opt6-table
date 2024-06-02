<template>
	<div
		class="select field"
		:class="`select_${index}`"
	>
		<div
			@click="showOptionsHandler($event)"
			class="select__input-wrapper"
		>
			<input
				class="select__input"
				type="text"
				v-model="optionModel"
				disabled
			/>
		</div>
		<Teleport to="#app">
			<Transition name="fade">
				<div
					v-if="showOptions"
					class="select__options"
					:style="optionsPosition"
				>
					<div
						@click="
							e => {
								model = option;
								showOptions = false;
								$emit('change', $e);
							}
						"
						v-for="option in options"
						class="select__option"
					>
						{{ option.text }}
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup>
	import { computed, reactive, ref } from "vue";

	const model = defineModel();
	const optionModel = computed({
		get() {
			return model.value.text;
		},
		set(items) {
			model.value = items;
		},
	});

	const { options } = defineProps(["options"]);
	const emit = defineEmits(["change"]);

	const index = Math.ceil(Math.random() * new Date().getTime());

	const bodyClick = e => {
		if (!e.target.closest(`.select_${index}`)) {
			showOptions.value = false;
			document.querySelector("body").removeEventListener("pointerdown", bodyClick);
		}
	};

	const showOptions = ref(false);

	const optionsPosition = reactive({ width: 0, top: 0, left: 0 });
	const showOptionsHandler = e => {
		const position = e.target.getBoundingClientRect();
		optionsPosition.width = position.width + "px";
		optionsPosition.top = position.top + position.height + 5 + "px";
		optionsPosition.left = position.left + "px";
		showOptions.value = !showOptions.value;
		document.querySelector("body").addEventListener("pointerdown", bodyClick);
	};
</script>

<style lang="scss">
	.select {
		user-select: none;
		position: relative;
		width: 100%;
		&__input {
			padding: 10px 5px 10px 15px;
			border-radius: 5px;
			border: solid 1px #ccc;
			outline: none;
			border-radius: 5px;
			pointer-events: none;
			width: 100%;
			height: 100%;
			cursor: pointer;
			&-wrapper {
				width: 100%;
				cursor: pointer;
				position: relative;
				overflow: hidden;

				&::before {
					content: "";
					position: absolute;
					bottom: 1px;
					top: 1px;
					right: 1px;
					height: calc(100% - 2px);
					width: 21px;
					border-start-end-radius: 5px;
					border-end-end-radius: 5px;
					background-color: var(--white);
				}

				&::after {
					content: "";
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 5px;
					border: 4px solid transparent;
					border-left: 4px solid #c0c0c0;
				}
			}
		}
		&__options {
			overflow: hidden;
			position: absolute;
			z-index: 10;
			background-color: #fff;
			border-radius: 5px;
			box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
		}
		&__option {
			padding: 7px 10px;
			cursor: pointer;
			text-align: left;

			&:hover {
				background-color: var(--pale-grey);
			}
		}
	}
	@media (max-width: 768px) {
		.select {
			max-width: 100%;
		}
	}
</style>
