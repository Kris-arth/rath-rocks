import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        cream: "#ECE7DF",
        gold: "#C9A96A",
        surface: "#0D0D0D",
        "border-subtle": "#1C1C1C",
        "cream-dim": "rgba(236,231,223,0.45)",
        "gold-dim": "rgba(201,169,106,0.15)",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "sans-serif",
        ],
      },
      letterSpacing: {
        ultra: "0.35em",
        super: "0.2em",
      },
      animation: {
        "fade-up": "fadeUp 1.2s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        "line-grow": "lineGrow 1s ease forwards 0.6s",
        pulse: "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        lineGrow: {
          "0%": { width: "0" },
          "100%": { width: "6rem" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
