# Guava

使用web component制作的ui库，提供一些不常用而且业务复杂的组件，或者是一些奇怪的组件。

## 特性

- 支持 Vue，React，Angular，JQ 和无框架的项目
- 支持按需引入
- 支持TypeScript
- 开源

## 安装

```bash
pnpm add @lingjhf/guava
# with npm
npm install @lingjhf/guava
```

Vue3推荐安装

```bash
pnpm add @lingjhf/guava-vue
# with npm
npm install @lingjhf/guava-vue
```

## 使用

Vue3

```vue
<template>
  <GColorPicker></GColorPicker>
</template>

<script lang="ts" setup>
import { GColorPicker } from '@lingjhf/guava-vue'
</script>

```

## 文档

查看更多的组件，请看[Guava](https://lingjhf.github.io/guava/)

## 使用什么来构建Guava?

组件是使用[solidjs](https://solidjs.com/)构建的，solidjs是一个用于构建用户界面的js库，使用简单而且性能高效。

## License

[MIT](http://opensource.org/licenses/MIT)
