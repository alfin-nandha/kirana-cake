import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        brand: {
          bg: "#FFF5E8",
          heading: "#8B5E3C",
          button: "#C68642",
          highlight: "#F7D488",
          text: "#3B2A1E",
          // Dark mode counterparts
          "dark-bg": "#1C0F06",
          "dark-surface": "#2A1A0E",
          "dark-border": "#3D2512",
          "dark-text": "#FFF5E8",
          "dark-muted": "#C4A882",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(5deg)" },
          "66%": { transform: "translateY(-10px) rotate(-3deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
