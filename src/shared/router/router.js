import { createRouter, createWebHistory } from "vue-router";

import Products from "@pages/products/Products.vue";
import All from "@pages/All.vue";
import Expenses from "@pages/Expenses.vue";

const routes = [
	{ path: "/", component: Products },
	{ path: "/all", component: All },
	{ path: "/expenses", component: Expenses },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
