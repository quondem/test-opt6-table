export default {
	state: () => ({
		tableStructure: [
			{ id: 1, head: "Номер строки", field: "drag" },
			{ id: 2, head: "Действие", field: "options" },
			{ id: 3, head: "Наименование еденицы", field: "unit" },
			{ id: 4, head: "Цена", field: "cost" },
			{ id: 5, head: "Кол-во", field: "count" },
			{ id: 6, head: "Название товара", field: "name" },
			{ id: 7, head: "Итого", field: "total" },
		],
		tableStructureCopy: [
			{ id: 1, head: "Номер строки", field: "drag" },
			{ id: 2, head: "Действие", field: "options" },
			{ id: 3, head: "Наименование еденицы", field: "unit" },
			{ id: 4, head: "Цена", field: "cost" },
			{ id: 5, head: "Кол-во", field: "count" },
			{ id: 6, head: "Название товара", field: "name" },
			{ id: 7, head: "Итого", field: "total" },
		],
	}),
	getters: {
		getTableStructure: state => state.tableStructure,
		getTableStructureCopy: state => state.tableStructureCopy,
	},
	mutations: {
		setTableStructure(state, tableStructure) {
			state.tableStructure = tableStructure;
		},
	},
	actions: {},
};
