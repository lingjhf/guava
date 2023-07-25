import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import UnoCSS from 'unocss/vite'
import { presetUno } from 'unocss'

export default defineConfig({
  plugins: [solidPlugin(), UnoCSS({
    presets: [presetUno({ preflight: false })],
    preflights: [
      {
        getCSS() {
          return ` 
          body {
            margin: 0px;
          }
        `
        }
      }
    ]
  }),],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName(name, filename, css) {
        return name
      }
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
