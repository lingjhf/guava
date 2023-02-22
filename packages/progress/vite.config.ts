import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import Unocss from 'unocss/vite'
import { presetWind, transformerDirectives } from 'unocss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      presets: [presetWind({ preflight: false })],
      transformers: [transformerDirectives()],
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer({ overrideBrowserslist: [] })],
    },
  },
  build: {
    outDir: 'dist',
    lib: { entry: './src/index.tsx', fileName: 'index', formats: ['es'] },
    target: 'esnext',
  },
})