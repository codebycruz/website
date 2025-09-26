// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://codebycruz.com",

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [
		icon({
			include: {
				mdi: ["*"],
				ion: ["*"],
				"simple-icons": ["*"],
			},
		}),
		sitemap(),
	],
});
