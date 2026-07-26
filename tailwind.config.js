/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        accent: "#7C5CFF",
        "accent-secondary": "#3BC9FF",
        laravel: "#FF2D20",
        card: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: { "4xl": "28px" },
    },
  },
  plugins: [],
};
