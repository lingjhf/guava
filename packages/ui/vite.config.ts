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
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: 'dist/es',
    cssCodeSplit: true,
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js', 'solid-js/web', 'solid-js/store', 'color'],
      output: {
        entryFileNames(chunkInfo) {
          return `${chunkInfo.name}.js`
        },
        assetFileNames(chunkInfo) {
          return `${chunkInfo.name}`
        },
        chunkFileNames(chunkInfo) {
          return `${chunkInfo.name}.js`
        },
        manualChunks(id) {
          const pkgName = id.match(/ui\/src\/(.*?)\//)
          if (pkgName) {
            return `${pkgName[1]}`
          }
        },
      },
    },
  },
})
