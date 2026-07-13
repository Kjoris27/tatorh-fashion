import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sand: "#F7F1E6",
        card: "#FFFDF8",
        ink: "#241E1A",
        "ink-soft": "#5B4D42",
        green: "#1F4D3E",
        "green-deep": "#153A2E",
        gold: "#C08A2E",
        "gold-soft": "#E9D2A0",
        wine: "#7A2436",
        line: "rgba(36,30,26,0.14)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)"],
        sans: ["var(--font-instrument)"],
      },
      borderRadius: { card: "18px" },
    },
  },
};

export default config;
