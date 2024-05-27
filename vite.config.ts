import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all')],
  base: '/react-shopping-cart/dist',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
