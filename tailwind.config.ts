import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" }
        },
        slowzoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" }
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        shake: "shake 0.3s ease-in-out",
        slowzoom: "slowzoom 20s ease-in-out infinite alternate",
        fadeInUp: "fadeInUp 0.7s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
