import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";

function manualChunks(id: string) {
  if (id.includes("node_modules")) {
    return "vendor";
  }
  return "main";
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), removeConsole()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});
