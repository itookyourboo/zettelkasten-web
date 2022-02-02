import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    host: '127.0.0.1',
    origin: 'http://127.0.0.1:3000/'
  },
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
