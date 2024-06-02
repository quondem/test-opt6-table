<template>
	<div
		class="gear"
		:class="`gear_${index}`"
	>
		<img
			@click="showOptions = !showOptions"
			src="@assets/images/gear.svg"
			alt="gear"
		/>
		<div
			v-if="showOptions"
			class="gear__dropdown"
		>
			<Drop title="Отображение столбцов">
				<div
					v-for="({ head, id }, key) in tableStructureCopy"
					class="columns__wrap"
				>
					<input
						:key="id"
						:id="`input${id}`"
						:checked="tableStructure.find(item => item.id == id)"
						@click="
							e => {
								let columnIndex = tableStructure.findIndex(item => item.id == id);

								columnIndex >= 0 ? tableStructure.splice(columnIndex, 1) : tableStructure.splice(key, 0, tableStructureCopy[key]);
							}
						"
						type="checkbox"
						class="columns__input"
					/>
					<label :for="`input${id}`">{{ head }}</label>
				</div>
			</Drop>
			<Drop title="Порядок столбцов">
				<VueDraggable
					class="columns_draggable"
					v-model="tableStructure"
				>
					<div
						v-for="({ head, id }, key) in tableStructure"
						class="columns__wrap"
					>
						<img
							class="columns__drag"
							src="@assets/images/drag.svg"
							alt="drag"
						/>
						<label :for="`input${id}`">{{ head }}</label>
						<div class="dragging"></div>
					</div>
				</VueDraggable>
			</Drop>
		</div>
	</div>
</template>

<script setup>
	import { reactive, ref, computed } from "vue";
	import { useStore } from "vuex";
	import Drop from "./components/Drop.vue";
	import { VueDraggable } from "vue-draggable-plus";

	const { getters, commit } = useStore();

	const showOptions = ref(false);
	const showColumnsDisplay = ref(false);

	const tableStructure = computed({
		get() {
			return getters["getTableStructure"];
		},
		set(items) {
			commit("setTableStructure", items);
		},
	});

	const tableStructureCopy = getters["getTableStructureCopy"];

	const index = Math.ceil(Math.random() * new Date().getTime());

	document.querySelector("body").addEventListener("click", e => {
		if (!e.target.closest(`.gear_${index}`)) {
			showOptions.value = false;
			showColumnsDisplay.value = false;
		}
	});
</script>

<style lang="scss">
	.gear {
		width: 15px;
		height: 15px;
		display: inline-block;
		cursor: pointer;
		position: relative;
		&__dropdown {
			position: absolute;
			z-index: 10;
			overflow: hidden;
			bottom: 0;
			right: 0;
			left: 0;
			width: 179px;
			transform: translate(calc(-100% + 15px), calc(100% + 5px));
			border-radius: 5px;
			box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
			background-color: #fff;
		}
	}
	.drop {
		&__title {
			user-select: none;

			& span {
				user-select: none;
			}
		}
	}

	@media (max-width: 768px) {
		.gear {
			display: none;
		}
	}
</style>
