import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'node-stdlib-browser/helpers/crypto', // Use stdlib directly
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Optional: Improves build optimization
      }
    }
  }
});
