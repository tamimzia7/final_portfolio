import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // GitHub Pages deploys to https://<user>.github.io/final_portfolio/
  base: "/final_portfolio/",
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          motion: ["framer-motion", "gsap"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});
