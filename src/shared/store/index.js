import { createStore } from "vuex";
import table from "./modules/table";
import sidebar from "./modules/sidebar";

const store = createStore({
	modules: {
		table: table,
		sidebar: sidebar,
	},

	state() {
		return {
			items: [
				{
					id: 1,
					unit: { text: "Мраморный щебень фр. 2-5 мм, 25кг", value: 25 },
					cost: 1231,
					count: 123,
					name: { text: "Мраморный щебень", value: "marble" },
				},
				{
					id: 2,
					unit: { text: "Мраморный щебень фр. 2-5 мм, 25кг", value: 25 },
					cost: 1231,
					count: 123,
					name: { text: "Мраморный щебень", value: "marble" },
				},
			],
			changed: false,
		};
	},
	getters: {
		getChanged: state => state.changed,
		getItems: state => state.items,
		getLastId: state => (state.items[state.items.length - 1]?.id ? state.items[state.items.length - 1].id : 1),
		findIndexById: state => id => state.items.findIndex(item => item.id == id),
		getItemsWithTotal: (state, getters) => {
			for (let item of state.items) {
				item.total = item.cost * item.count;
			}
			return state.items;
		},
		getTotal: state => state.items.reduce((acc, item) => acc + +item.total, 0),
		getTotalCount: state => state.items.reduce((acc, item) => acc + +item.count, 0),
		getTotalWeight: state => state.items.reduce((acc, item) => acc + +item?.unit?.value * +item.count, 0),
	},
	mutations: {
		setItems(state, items) {
			state.items = items;
			state.changed = true;
		},
		setChanged(state, bool) {
			state.changed = bool;
		},
		addItem(state, item) {
			state.items.push(item);
			state.changed = true;
		},
		deleteItem(state, index) {
			state.items.splice(index, 1);
			state.changed = true;
		},
	},
	actions: {
		deleteItem({ commit }, index) {
			commit("deleteItem", index);
		},
		addItem({ commit, getters }) {
			const item = {
				id: getters["getLastId"] + 1,
				unit: { text: "Мраморный щебень фр. 2-5 мм, 25кг", value: 25 },
				cost: 1231,
				count: 123,
				name: { text: "Мраморный щебень", value: "marble" },
			};

			commit("addItem", item);
		},
		fetchItems({ commit, state }) {
			commit("setChanged", false);
			console.log(state.items);
			// fetch getters['getItems']
		},
	},
});

export default store;
