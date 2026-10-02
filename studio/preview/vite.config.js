import {resolve} from 'node:path'
import {defineConfig} from 'vite'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'client.js'),
      formats: ['es'],
      fileName: () => 'sanity-preview.js',
    },
    outDir: resolve(import.meta.dirname, '../../assets/js'),
    sourcemap: true,
  },
})
