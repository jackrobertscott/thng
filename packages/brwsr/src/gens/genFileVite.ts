/**
 *
 */
export const genFileVite = () => {
  const txt = `
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
    })
  `
  return txt
    .split('\n')
    .map((i) => i.slice(4)) // remove spaces at start
    .filter((i) => i.length)
    .join('\n')
}
