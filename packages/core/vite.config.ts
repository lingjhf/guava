import { PluginOption, defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import autoprefixer from 'autoprefixer'
import path from 'path'
import * as fs from 'fs'

function InjectImportCss(): PluginOption {
  return {
    name: 'inject-import-css',
    writeBundle(option, bundle) {
      const output = path.resolve(__dirname, 'lib')
      const cssFilenames = Object.keys(bundle).filter(item => item.endsWith('.css')).map(item => item.replace(/\.css/, ''))
      for (const cssFilename of cssFilenames) {
        console.log(cssFilename)
        const jsFilePath = path.resolve(output, `${cssFilename}.js`)
        const data = fs.readFileSync(path.resolve(output, jsFilePath), { encoding: 'utf-8' })
        fs.writeFileSync(path.resolve(output, jsFilePath), `import './${cssFilename}.css'\n${data}`)
      }
    }
  }
}

export default defineConfig({
  plugins: [solidPlugin(), InjectImportCss()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName(name, filename, css) {
        return name
      }
    },
    postcss: {
      plugins: [autoprefixer({ overrideBrowserslist: [] })],
    },
  },
  server: {
    port: 3000,
  },
  build: {
    cssCodeSplit: true,
    target: 'esnext',
    outDir: 'lib',
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'solid-js',
        'solid-js/web',
        'solid-js/store',
        'solid-element',
        'color',
        'yup',
        'highlight.js',
        'dayjs',
      ],
      output: {
        entryFileNames(chunkInfo) {
          return `${chunkInfo.name}.js`
        },
        chunkFileNames(chunkInfo) {
          return `${chunkInfo.name}.js`
        },
        manualChunks(id) {
          const pkgName = id.match(/core\/src\/(.*?)\//)
          if (pkgName) {
            return `${pkgName[1]}`
          }
        },
      },
    },
  },
})
