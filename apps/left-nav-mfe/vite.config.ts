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
      name: 'leftNavMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './LeftNav': './src/components/LeftNav',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  base: '/left-nav-mfe/',
  server: {
    port: 3002,
  },
  build: {
    target: 'esnext',
  },
})
