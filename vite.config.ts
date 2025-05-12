import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build'
  },
  server: {
    port: 3000
  },
  plugins: [react()]
})
