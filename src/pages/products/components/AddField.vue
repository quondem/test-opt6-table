<template>
	<div class="add">
		<div
			@click="$emit('add')"
			class="add__button"
		>
			<img
				src="/images/add.png"
				alt="add"
				class="add__img"
			/>
			<span>Добавить строку</span>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
	.add {
		padding: 20px 25px;
		border-radius: var(--borderR);
		background-color: #fff;
		box-shadow: 0 5px 20px 0 var(--black-7);
		border: solid 1px var(--pale-grey);
		font-size: 14px;
		&__button {
			cursor: pointer;
			display: inline-flex;
			align-items: center;
			gap: 7px;
			padding: 10px 15px 10px 10px;
			border-radius: 5px;
			color: #fff;
			background-color: #2f8cff;
		}
		&__img {
			width: 11px;
			height: 11px;
		}
	}
</style>
