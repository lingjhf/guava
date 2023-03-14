import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  build: {
    target: 'esnext',
    outDir: 'lib',
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', '@lingjhf/guava', '@vue/runtime-dom'],
    },
  },
})
