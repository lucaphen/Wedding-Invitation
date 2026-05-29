import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#9E0000",
          dark: "#7A0000",
          light: "#B91111",
        },
        blush: "#FFEBFF",
        linen: {
          DEFAULT: "#D8CBB0",
          light: "#E7DDC6",
          dark: "#BCAE8E",
          shadow: "#A89A78",
        },
        wax: {
          DEFAULT: "#8A4B26",
          light: "#B0743F",
          dark: "#5E3015",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        script: ["var(--font-script)", "Pinyon Script", "cursive"],
      },
      keyframes: {
        "soft-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "soft-pulse": "soft-pulse 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
