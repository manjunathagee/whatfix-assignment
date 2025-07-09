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
      name: "cartMfe",
      filename: "remoteEntry.js",
      exposes: {
        "./Cart": "./src/components/Cart",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  base: isProduction ? "/" : "/cart-mfe/",
  server: {
    port: 3003,
    cors: true, // Enable CORS for development
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        // Ensure consistent chunk naming for production
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  preview: {
    port: 3003,
    cors: true,
  },
});
