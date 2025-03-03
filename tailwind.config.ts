import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: "#08091a",
          medium: "#0a0d26",
          light: "#080d1f",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "space-gradient":
          "linear-gradient(to bottom, #08091a, #0a0d26, #080d1f)",
      },
      boxShadow: {
        "neon-blue":
          "0 0 5px rgba(0, 140, 255, 0.5), 0 0 15px rgba(0, 140, 255, 0.3)",
        "neon-inner": "0 0 5px rgba(0, 140, 255, 0.3) inset",
      },
    },
  },
  plugins: [],
} satisfies Config;
