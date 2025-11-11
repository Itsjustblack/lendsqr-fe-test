import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(), // Disable React Compiler
	],
	server: {
		allowedHosts: [
			"orbiculately-subtemperate-evelin.ngrok-free.dev", // 👈 your ngrok hostname
		],
	},
});
