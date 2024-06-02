<template>
	<div class="calculator">
		<div class="calculator__wrapper">
			<div class="calculator__item">
				<p class="calculator__name">Сумма:</p>
				<p class="calculator__cost">{{ total + " руб" }}</p>
			</div>
			<div class="calculator__item">
				<p class="calculator__name">Кол-во:</p>
				<p class="calculator__cost">{{ count + " шт" }}</p>
			</div>
			<div class="calculator__item">
				<p class="calculator__name">Общий вес:</p>
				<p class="calculator__cost">{{ weight + " кг" }}</p>
			</div>
		</div>
		<div class="calculator__wrapper">
			<div class="calculator__item">
				<p class="calculator__name_total">Общая сумма:</p>
				<p class="calculator__cost calculator__cost_total">{{ total + " руб" }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed, ref } from "vue";
	import { useStore } from "vuex";

	const { getters } = useStore();

	const total = computed(() => formatNumberWithSpaces(getters["getTotal"]));
	const count = computed(() => formatNumberWithSpaces(getters["getTotalCount"]));
	const weight = computed(() => formatNumberWithSpaces(getters["getTotalWeight"]));

	function formatNumberWithSpaces(number) {
		const numberString = number.toString();
		const formattedString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		return formattedString;
	}
</script>

<style lang="scss" scoped>
	.calculator {
		margin-top: 15px;
		margin-right: 15px;
		font-size: 14px;
		align-self: end;
		display: flex;
		flex-direction: column;
		gap: 5px;
		max-width: 304px;
		width: 100%;
		&__wrapper {
			display: flex;
			flex-direction: column;
			gap: 15px;
			padding: 15px;
			border-radius: 5px;
			border: solid 1px var(--pale-grey);
			background-color: var(--pale-grey-two);
		}
		&__item {
			display: flex;
			justify-content: space-between;
		}
		&__name {
			color: #8f8f8f;
			&_total {
				color: #000;
			}
		}
		&__cost {
			&_total {
				font-weight: 600;
			}
		}
	}
	@media (max-width: 768px) {
		.calculator {
			margin-top: 25px;
			margin-right: 0;
			max-width: 100%;
		}
	}
</style>
