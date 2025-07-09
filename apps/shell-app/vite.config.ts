import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
     tailwindcss(),
    federation({
      name: 'shell-app',
      remotes: {
        headerMfe: 'http://localhost:3001/assets/remoteEntry.js',
        leftNavMfe: 'http://localhost:3002/assets/remoteEntry.js',
        cartMfe: 'http://localhost:3003/assets/remoteEntry.js',
        ordersMfe: 'http://localhost:3004/assets/remoteEntry.js',
        profileMfe: 'http://localhost:3005/assets/remoteEntry.js',
        checkoutMfe: 'http://localhost:3006/assets/remoteEntry.js',
        paymentMfe: 'http://localhost:3007/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})