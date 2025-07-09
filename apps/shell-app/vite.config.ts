import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shell-app',
      remotes: {
        headerMfe: 'http://localhost:3001/header-mfe/assets/remoteEntry.js',
        leftNavMfe: 'http://localhost:3002/left-nav-mfe/assets/remoteEntry.js',
        cartMfe: 'http://localhost:3003/cart-mfe/assets/remoteEntry.js',
        ordersMfe: 'http://localhost:3004/orders-mfe/assets/remoteEntry.js',
        profileMfe: 'http://localhost:3005/profile-mfe/assets/remoteEntry.js',
        checkoutMfe: 'http://localhost:3006/checkout-mfe/assets/remoteEntry.js',
        paymentMfe: 'http://localhost:3007/payment-mfe/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  server: {
    port: 3000,
    fs: {
      allow: ['..']
    }
  },
  build: {
    target: 'esnext',
  },
})