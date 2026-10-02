import {resolve} from 'node:path'
import {defineConfig} from 'vite'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        'sanity-preview': resolve(import.meta.dirname, 'client.js'),
        'sanity-cms': resolve(import.meta.dirname, 'cms-client.js'),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    outDir: resolve(import.meta.dirname, '../../assets/js'),
    sourcemap: true,
  },
})
