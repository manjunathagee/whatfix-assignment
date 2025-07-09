import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Environment-based configuration
const isProduction = process.env.NODE_ENV === "production";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "ordersMfe",
      filename: "remoteEntry.js",
      exposes: {
        "./Orders": "./src/components/Orders",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  base: isProduction ? "/" : "/orders-mfe/",
  server: {
    port: 3004,
  },
  build: {
    target: "esnext",
  },
});
