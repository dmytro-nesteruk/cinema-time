import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 3000,
		open: true
	},
	plugins: [
		tsconfigPaths(),
		TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
		react()
	]
});
