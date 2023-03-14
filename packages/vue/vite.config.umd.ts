import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  build: {
    target: 'esnext',
    outDir: 'umd',
    lib: {
      name: 'guava',
      entry: './src/index.ts',
      formats: ['umd'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.min.js',
      },
    },
  },
})
