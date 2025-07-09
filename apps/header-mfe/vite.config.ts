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
      name: 'headerMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/components/Header',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  base: '/header-mfe/',
  server: {
    port: 3001,
  },
  build: {
    target: 'esnext',
  },
})
