import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import css from 'rollup-plugin-import-css'

export default defineConfig([
  {
    plugins: [dts(), css()],
    input: './src/index.ts',
    external: ['uno.css'],
    output: {
      dir: 'lib',
      chunkFileNames(chunkInfo) {
        return `${chunkInfo.name}.d.ts`
      },
      manualChunks(id) {
        const pkgName = id.match(/ui\/src\/(.*?)\//)
        if (pkgName) {
          return `${pkgName[1]}`
        }
      },
    },
  },
])
