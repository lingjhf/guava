import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import dts from 'rollup-plugin-dts'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    rollupOptions: {
      input: './src/index.tsx',
      output: [{ dir: './dist', file: './dist/index.d.ts', format: 'es' }],
      plugins: [dts()],
    },
    lib: { entry: './src/index.tsx', fileName: './dist/index.mjs' },
    // outDir: './dist',
    // target: 'esnext',
  },
})
