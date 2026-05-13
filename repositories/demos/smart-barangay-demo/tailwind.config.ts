import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",
        success: "#16a34a",
        warn: "#f59e0b",
        danger: "#dc2626",
      },
    },
  },
  plugins: [forms],
};

export default config;
