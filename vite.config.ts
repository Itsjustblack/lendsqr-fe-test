import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(), // Disable React Compiler
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		allowedHosts: [
			"orbiculately-subtemperate-evelin.ngrok-free.dev", // 👈 your ngrok hostname
		],
	},
});
