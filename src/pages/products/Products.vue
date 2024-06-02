<template>
	<AddField @add="dispatch('addItem')" />
	<div class="table__wrapper">
		<div class="table__options">
			<p
				v-if="changed"
				@click="dispatch('fetchItems')"
				class="table__save"
			>
				Cохранить изменения
			</p>
			<Gear />
		</div>
		<Table />
		<Calculator />
	</div>
</template>

<script setup>
	import { computed } from "vue";
	import AddField from "./components/AddField.vue";
	import Table from "./components/Table.vue";
	import Calculator from "./components/Calculator.vue";
	import Gear from "@ui/gear/Gear.vue";

	import { useStore } from "vuex";

	const { getters, dispatch } = useStore();
	const changed = computed(() => getters["getChanged"]);
</script>

<style lang="scss" scoped></style>
