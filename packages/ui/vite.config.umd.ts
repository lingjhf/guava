import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import autoprefixer from 'autoprefixer'
export default defineConfig({
  plugins: [solidPlugin()],
  css: {
    postcss: {
      plugins: [autoprefixer({ overrideBrowserslist: [] })],
    },
  },
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
        entryFileNames: () => 'index.min.js',
      },
    },
  },
})
