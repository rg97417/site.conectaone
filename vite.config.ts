import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
    modulePreload: {
      polyfill: false,
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core - raramente muda, excelente para cache
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Radix UI components - atualizações menos frequentes
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip'
          ],
          // Utilities - estáveis
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 3000
  },
}) 