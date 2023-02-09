import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

import solidPlugin from 'vite-plugin-solid'
import dts from 'rollup-plugin-dts'

export default defineConfig([
  {
    watch: { include: 'src/**' },
    plugins: [solidPlugin(), typescript()],
    external: ['solid-js/web'],
    input: './src/index.tsx',
    output: {
      dir: './dist',
      format: 'es',
    },
  },
  {
    plugins: [dts()],
    input: './src/index.tsx',
    output: {
      dir: './dist',
      format: 'es',
    },
  },
])
