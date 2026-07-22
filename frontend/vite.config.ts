import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Mirrors the nginx proxy used in production (see frontend/nginx.conf):
    // relative /api and /uploads calls hit the right backend either way.
    // '/api/leads' is more specific than '/api', so it must come first.
    proxy: {
      '/api/leads': { target: 'http://localhost:4100', changeOrigin: true },
      '/api': { target: 'http://localhost:4000', changeOrigin: true },
      '/uploads': { target: 'http://localhost:4000', changeOrigin: true },
    },
  },
})
