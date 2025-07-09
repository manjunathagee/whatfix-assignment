import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Environment-based configuration
const isProduction = process.env.NODE_ENV === "production";

// Base URLs for different environments
const getBaseUrl = (port: number, path: string) => {
  if (isProduction) {
    // Production URLs - using environment variables
    const productionUrls: Record<number, string> = {
      3001: process.env.HEADER_MFE_URL || "",
      3002: process.env.LEFT_NAV_MFE_URL || "",
      3003: process.env.CART_MFE_URL || "",
      3004: process.env.ORDERS_MFE_URL || "",
      3005: process.env.PROFILE_MFE_URL || "",
      3006: process.env.CHECKOUT_MFE_URL || "",
      3007: process.env.PAYMENT_MFE_URL || "",
    };

    const url = productionUrls[port];
    if (!url) {
      console.warn(`No environment variable set for port ${port}`);
      return "";
    }

    return `${url}/assets/remoteEntry.js`;
  }
  // Development URLs
  return `http://localhost:${port}${path}/assets/remoteEntry.js`;
};

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
      name: "shell-app",
      remotes: {
        headerMfe: getBaseUrl(3001, "/header-mfe"),
        leftNavMfe: getBaseUrl(3002, "/left-nav-mfe"),
        cartMfe: getBaseUrl(3003, "/cart-mfe"),
        ordersMfe: getBaseUrl(3004, "/orders-mfe"),
        profileMfe: getBaseUrl(3005, "/profile-mfe"),
        checkoutMfe: getBaseUrl(3006, "/checkout-mfe"),
        paymentMfe: getBaseUrl(3007, "/payment-mfe"),
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    port: 3000,
    fs: {
      allow: [".."],
    },
  },
  build: {
    target: "esnext",
  },
});
