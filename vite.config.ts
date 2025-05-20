import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  build: {
    outDir: 'build'
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target:	 (process.env.API_URL || 'http://localhost:8080'),
        changeOrigin: true,
        secure: false,
      },
      '/jbrowse': {
        target:	 (process.env.API_URL || 'http://localhost:8080'),
        changeOrigin: true,
        secure: false,
      },
      '/bluegenes': {
        target:	 (process.env.API_URL || 'http://localhost:8080'),
        changeOrigin: true,
        secure: false,
      },
      '/swagger-ui': {
        target:	 (process.env.API_URL || 'http://localhost:8080'),
        changeOrigin: true,
        secure: false,
      },
      '/openapi': {
        target:	 (process.env.API_URL || 'http://localhost:8080'),
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: [
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: '$1',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // @ts-expect-error For some reason the type doesn't have this as an option, but it definitely exists
        silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import']
      },
    },
  },
  plugins: [react()]
})
