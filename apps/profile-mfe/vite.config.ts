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
      name: 'profileMfe',
      filename: 'remoteEntry.js',
      exposes: {
        './Profile': './src/components/Profile',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  base: '/profile-mfe/',
  server: {
    port: 3005,
  },
  build: {
    target: 'esnext',
  },
})
