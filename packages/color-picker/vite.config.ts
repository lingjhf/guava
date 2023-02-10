import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import Unocss from 'unocss/vite'
import { presetWind } from 'unocss'
export default defineConfig({
  plugins: [solidPlugin(), Unocss({ presets: [presetWind({ preflight: false })] })],
  build: {
    outDir: 'dist',
    lib: { entry: './src/index.tsx', fileName: 'index', formats: ['es'] },
    target: 'esnext',
  },
})
