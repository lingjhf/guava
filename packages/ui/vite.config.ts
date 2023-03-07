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
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: 'lib',
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js', 'solid-js/web', 'solid-js/store', 'solid-element', 'color'],
      output: {
        entryFileNames(chunkInfo) {
          return `${chunkInfo.name}.js`
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
