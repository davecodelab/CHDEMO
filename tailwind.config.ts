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
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#07060A",
        "ink-soft": "#12101A",
        ivory: "#F5EFE0",
        "ivory-dim": "#C9BBA7",
        gold: "#C8A25C",
        "gold-dim": "#7A5C2A",
        rust: "#8B4513",
      },
      animation: {
        "fade-up": "fadeUp 0.9s ease forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "grain": "grain 0.4s steps(1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(3%, 2%)" },
          "30%": { transform: "translate(-1%, 4%)" },
          "40%": { transform: "translate(2%, -2%)" },
          "50%": { transform: "translate(-3%, 1%)" },
          "60%": { transform: "translate(1%, -4%)" },
          "70%": { transform: "translate(3%, 3%)" },
          "80%": { transform: "translate(-2%, 1%)" },
          "90%": { transform: "translate(2%, -1%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
