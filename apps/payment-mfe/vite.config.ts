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
      name: "paymentMfe",
      filename: "remoteEntry.js",
      exposes: {
        "./Payment": "./src/components/Payment",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  base: isProduction ? "/" : "/payment-mfe/",
  server: {
    port: 3007,
  },
  build: {
    target: "esnext",
  },
});
