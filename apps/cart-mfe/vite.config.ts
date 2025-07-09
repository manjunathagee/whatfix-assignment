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
      name: 'cartMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './Cart': './src/components/Cart',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  base: '/cart-mfe/',
  server: {
    port: 3003,
  },
  build: {
    target: 'esnext',
  },
})
