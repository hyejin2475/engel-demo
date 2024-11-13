import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brown: {
          light: "#efefee",
          semilight: "#CFBDA8",
          DEFAULT: "#AA9481",
          dark: "#4E3213",
        },
      },
      fontFamily: {
        'sf-pro': ['SF Pro Display', 'sans-serif']
      }
    },
  },
  plugins: [],
};
export default config;
