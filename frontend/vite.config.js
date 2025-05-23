import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
    // Vite automatically handles SPA fallback for client-side routing
  }
})
