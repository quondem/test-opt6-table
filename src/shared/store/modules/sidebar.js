export default {
	state: () => ({ isOpen: false }),
	getters: {
		getIsOpen: state => state.isOpen,
	},
	mutations: {
		setOpenSidebar(state, bool) {
			state.isOpen = bool;
		},
	},
	actions: {},
};
