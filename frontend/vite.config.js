import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/base': {
        // target: 'https://rash-diary.onrender.com', // Replace with your backend server address
        target: 'http://localhost:3000', // Replace with your backend server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/base/, ''),
      },
    },
  },
});
