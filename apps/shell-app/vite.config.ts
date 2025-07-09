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
    // Production URLs - replace with your actual production domains
    const productionUrls: Record<number, string> = {
      3001: process.env.HEADER_MFE_URL || "https://header-mfe.yourdomain.com",
      3002:
        process.env.LEFT_NAV_MFE_URL || "https://left-nav-mfe.yourdomain.com",
      3003: process.env.CART_MFE_URL || "https://cart-mfe.yourdomain.com",
      3004: process.env.ORDERS_MFE_URL || "https://orders-mfe.yourdomain.com",
      3005: process.env.PROFILE_MFE_URL || "https://profile-mfe.yourdomain.com",
      3006:
        process.env.CHECKOUT_MFE_URL || "https://checkout-mfe.yourdomain.com",
      3007: process.env.PAYMENT_MFE_URL || "https://payment-mfe.yourdomain.com",
    };
    return `${productionUrls[port]}/assets/remoteEntry.js`;
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
