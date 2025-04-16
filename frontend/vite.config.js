import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// vite.config.js
export default {
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'] // Add any external libraries here that shouldn't be bundled
    }
  }
}
