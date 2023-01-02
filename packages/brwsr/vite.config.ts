import path from 'path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
/**
 *
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    force: true,
    include: ['oi4ch0zjda'],
  },
  build: {
    commonjsOptions: {
      include: [/oi4ch0zjda/, /node_modules/],
    },
  },
})
