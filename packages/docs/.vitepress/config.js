import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/guava/',
  title: 'Guava',
  themeConfig: {
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '安装', link: '/guide/install.md' },
          { text: '快速开始', link: '/guide/quickstart.md' },
        ],
      },
      {
        text: '组件',
        items: [
          { text: 'Color Picker', link: '/components/color-picker' },
          { text: 'Scroll Area', link: '/components/scroll-area' },
          { text: 'Virtual Area', link: '/components/virtual-scroll' },
          { text: 'Drop Area', link: '/components/drop-area' },
          { text: 'Progress', link: '/components/progress' },
          { text: 'Draggable', link: '/components/draggable' },
          { text: 'Circular Menu', link: '/components/circular-menu' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/lingjhf/guava' }],
  },
})
