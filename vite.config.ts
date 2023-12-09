/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { qrcode } from 'vite-plugin-qrcode'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  envDir: './env/',
  plugins: [react(), qrcode()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // you can replace this port with any port
  },
  preview: {
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // you can replace this port with any port
  },
  test: {
    globals: true,
    watch: false,
    environment: 'happy-dom',
    setupFiles: './src/setup-test.ts',
  },
  build: {
    sourcemap: true,
    target: 'modules',
    minify: true,
    // cssTarget: 'modules',
    cssMinify: true,
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react'],
          react_jsx: ['react/jsx-runtime'],
          react_dom: ['react-dom'],
        },
      },
    },
  },
})
