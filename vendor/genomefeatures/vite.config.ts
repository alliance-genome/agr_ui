import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

// this is a 'library mode' vite config
export default defineConfig({
  build: {
    outDir: './dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/genomefeatures.ts'),
      name: 'GenomeFeatureComponent',
      fileName: 'genomefeatures',
    },
  },

  plugins: [dts()],
})
