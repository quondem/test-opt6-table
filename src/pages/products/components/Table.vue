<template>
	<div class="table__container">
		<table
			ref="refTable"
			class="table"
		>
			<thead class="table__thead">
				<VueDraggable
					v-model="tableStructure"
					tag="tr"
					handle=".table__drag-zone"
					class="table__header"
				>
					<th
						class="table__head"
						:key="id"
						v-for="({ head, id }, index) in tableStructure"
						:style="{ minWidth: widthForComponents?.[index] }"
					>
						<div class="table__drag-zone">
							<span class="table__head-text">{{ head }}</span>
							<div class="dragging"></div>
						</div>
						<span
							ref="refResizer"
							class="resizer"
							@mouseover="resizerHover($event)"
							@mouseleave="$event.target.style.height = 'auto'"
							@mousedown="resizeEvent($event, index)"
						></span>
					</th>
				</VueDraggable>
			</thead>
			<VueDraggable
				class="table__body"
				v-model="items"
				tag="tbody"
				handle=".drag"
			>
				<tr
					class="table__row"
					v-for="(item, itemIndex) in items"
					:key="item.id"
				>
					<td
						class="table__field"
						v-for="({ field, head, id }, index) in tableStructure"
						:key="id"
						:style="{ width: widthForComponents?.[index] }"
					>
						<p class="table__field-head">{{ head }}</p>
						<component
							@change="commit('setChanged', true)"
							v-model="item[field]"
							:is="componentsMap[field].component"
							:index="itemIndex"
							:options="componentsMap[field].options"
							:disabled="componentsMap[field].disabled"
							@delete="dispatch('deleteItem', itemIndex)"
						/>
					</td>
				</tr>
			</VueDraggable>
		</table>
	</div>
</template>

<script setup>
	import { computed, onMounted, ref, shallowRef, reactive } from "vue";
	import vDrag from "@ui/fields/Drag.vue";
	import vOptions from "@ui/fields/Options.vue";
	import vInput from "@ui/fields/Input.vue";
	import vSelect from "@ui/fields/Select.vue";
	import { VueDraggable } from "vue-draggable-plus";
	import { useStore } from "vuex";

	const { getters, commit, dispatch } = useStore();

	const items = computed({
		get() {
			return getters["getItemsWithTotal"];
		},
		set(items) {
			commit("setItems", items);
		},
	});

	const tableStructure = computed({
		get() {
			return getters["getTableStructure"];
		},
		set(items) {
			commit("setTableStructure", items);
		},
	});

	const selectOptionsUnit = ref([
		{ text: "Мраморный щебень фр. 2-5 мм, 25кг", value: 25 },
		{ text: "Мраморный щебень фр. 2-5 мм, 25кг (белый)", value: 25 },
		{ text: "Мраморный щебень фр. 2-5 мм, 25кг (вайт)", value: 25 },
		{ text: "Мраморный щебень фр. 2-5 мм, 25кг, возврат", value: 25 },
		{ text: "Мраморный щебень фр. 2-5 мм, 1т", value: 1000 },
	]);
	const selectOptionsName = ref([
		{ text: "Мраморный щебень", value: "marble" },
		{ text: "Гранитный щебень", value: "granit" },
		{ text: "Гравийный щебень", value: "graviy" },
	]);

	const componentsMap = shallowRef({
		drag: { component: vDrag },
		options: { component: vOptions },
		unit: { component: vSelect, options: selectOptionsUnit.value },
		cost: { component: vInput },
		count: { component: vInput },
		name: { component: vSelect, options: selectOptionsName.value },
		total: { component: vInput, disabled: true },
	});

	const refTable = ref(null);

	// width for components

	const widthForComponents = ref([]);
	const setWidthForComponents = () => {
		if (window.innerWidth > 768) {
			widthForComponents.value = ["45px", "30px", "350px", "190px", "95px", "227px", "175px"];
		} else {
			widthForComponents.value = [];
		}
	};
	setWidthForComponents();
	window.addEventListener("resize", setWidthForComponents);

	// resizer

	const refResizer = ref(null);

	const resizerHover = e => {
		e.target.style.height = `${refTable.value?.offsetHeight}px`;
	};

	const resizeEvent = (e, index) => {
		e.stopPropagation();
		let x, w;

		x = e.clientX;
		w = e.target.parentElement?.offsetWidth;

		document.addEventListener("mousemove", function mousemoveHandler(event) {
			let dx = event.clientX - x;
			let cw = w + dx;
			e.target.style.height = `${refTable.value?.offsetHeight}px`;

			widthForComponents.value[index] = `${cw}px`;
			document.addEventListener("mouseup", function mouseupHandler() {
				e.target.style.height = "100%";

				document.removeEventListener("mouseup", mouseupHandler);
				document.removeEventListener("mousemove", mousemoveHandler);
			});
		});
	};

	onMounted(() => {});
</script>

<style lang="scss">
	.table {
		// width: 100% !important;
		user-select: none;
		display: block;

		&__container {
			// min-width: 100%;
			overflow-x: auto;
			overflow-y: hidden;
		}
		&__wrapper {
			display: flex;
			flex-direction: column;
			box-shadow: 0 5px 20px 0 var(--black-7);
			border: solid 1px var(--pale-grey);
			border-radius: var(--borderR);
			background-color: #fff;
			width: 100%;
			padding: 0 0 25px 0;
		}
		&__options {
			display: inline-flex;
			gap: 20px;
			align-items: center;
			align-self: end;
			padding: 0 15px;
			height: 32px;
		}
		&__save {
			font-size: 12px;
			color: #a6b7d4;
			cursor: pointer;
		}
		&__head {
			text-align: left;
			border-top: 1px solid var(--pale-grey);
			border-bottom: 1px solid var(--pale-grey);
			font-weight: 600;
			position: relative;
			height: 45px;
			padding: 0 8px;
			vertical-align: middle;
			user-select: none;
			max-width: 20px;
			@media (max-width: 768px) {
				max-width: 100%;
			}
			&-text {
				overflow: hidden;
				white-space: nowrap;
			}
			&:first-child {
				border-left: 0;
			}
			&:last-child {
				border-right: 0;
				padding-right: 10px;
				& .resizer {
					display: none;
				}
			}
		}
		&__row {
			height: 45px;
			position: relative;
		}
		&__field {
			vertical-align: middle;
			height: 45px;
			padding: 5px 11px;
			text-align: center;
			max-width: 20px;
			overflow: hidden;
			width: 100%;
			@media (max-width: 768px) {
				max-width: 100%;
			}
			&-head {
				display: none;
			}
			& .field {
				display: flex;
				width: 100%;
			}
		}
		&__drag-zone {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
		}
	}
	.dragging {
		display: none !important;
	}
	.sortable-ghost .dragging {
		display: block !important;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: var(--pale-grey-two);
		border: dashed 2px #a6b7d4;
		border-radius: 5px;
		z-index: 11;
	}
	.resizer {
		position: absolute;
		margin: 0 2px;
		right: 0;
		bottom: 0;
		top: 0;
		height: 100%;
		width: 1px;
		background-color: var(--pale-grey);
		display: block;
		cursor: col-resize;
	}
	@media (max-width: 768px) {
		.table {
			display: block;

			&__field {
				height: auto;
				text-align: left;
				padding: 0;
				display: flex;
				width: 100%;
				flex-direction: column;
				justify-content: center;
				&-head {
					display: inline-block;
					margin-bottom: 5px;
					font-size: 10px;
					color: #8f8f8f;
				}
				& .field {
					height: 35px;
				}
			}

			&__body {
				display: flex;
				flex-direction: column;
				gap: 5px;
			}
			&__thead {
				display: none;
			}
			&__wrapper {
				background-color: transparent;
				box-shadow: unset;
				border: 0;
			}
			&__options {
				display: none;
			}
			&__row {
				padding: 15px 15px 25px 15px;
				height: auto;
				display: flex;
				flex-direction: column;
				align-items: start;
				gap: 15px;
				border-radius: 10px;
				box-shadow: 0 5px 20px 0 var(--black-7);
				border: solid 1px var(--pale-grey);
				background-color: #fff;
			}
		}
	}
</style>
