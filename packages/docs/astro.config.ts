import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import UnoCSS from 'unocss/astro'
import mdx from '@astrojs/mdx'
import { transformerDirectives } from 'unocss'

// https://astro.build/config
export default defineConfig({
  integrations: [
    solidJs(),
    mdx(),
    UnoCSS({
      extraContent: { filesystem: ['src/example/**/*'] },
      transformers: [transformerDirectives()]
    }),
  ],
})