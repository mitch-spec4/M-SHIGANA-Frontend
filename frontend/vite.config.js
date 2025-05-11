import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Add alias for @ to resolve to src
    },
  },
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
});
