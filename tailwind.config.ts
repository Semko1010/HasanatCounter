import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				glory: ["glory", "sans-serif"],
				quran: ["quran", "sans"],
				quran2: ["quran2", "sans"],
				quran3: ["quran3", "sans"],
				quran4: ["quran4", "sans"],
				quran5: ["quran5", "sans"],
			},
			backgroundImage: {
				"hero-pattern": "url('/images/bg/bgQuran1.jpeg')",
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
export default config;
