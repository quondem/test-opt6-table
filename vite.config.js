import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/test-opt6-table/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@assets": path.resolve(__dirname, "./src/shared/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@store": path.resolve(__dirname, "./src/shared/store"),
			"@router": path.resolve(__dirname, "./src/shared/router"),
			"@widgets": path.resolve(__dirname, "./src/widgets"),
			"@ui": path.resolve(__dirname, "./src/shared/ui"),
			"@pages": path.resolve(__dirname, "./src/pages"),
		},
	},
	plugins: [vue()],
});
