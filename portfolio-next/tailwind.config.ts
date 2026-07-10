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
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        accent: {
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
        },
        dark: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          800: "#1e293b",
          850: "#172033",
          900: "#0f172a",
          950: "#080f1f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-fira)", "Fira Code", "monospace"],
      },
      animation: {
        "gradient-x":   "gradient-x 15s ease infinite",
        "float":        "float 6s ease-in-out infinite",
        "float-slow":   "float 9s ease-in-out infinite",
        "blink":        "blink 0.75s step-end infinite",
        "draw-line":    "draw-line 1.5s ease-out forwards",
        "fade-up":      "fade-up 0.6s ease-out forwards",
        "spin-slow":    "spin 20s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-20px)" },
        },
        "blink": {
          "from, to": { borderColor: "transparent" },
          "50%":       { borderColor: "hsl(217 91% 60%)" },
        },
        "draw-line": {
          from: { height: "0%" },
          to:   { height: "100%" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundSize: {
        "300%": "300% 300%",
      },
      boxShadow: {
        "glow":       "0 0 40px -8px rgba(59,130,246,0.5)",
        "glow-lg":    "0 0 80px -12px rgba(59,130,246,0.6)",
        "glow-accent":"0 0 40px -8px rgba(168,85,247,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
