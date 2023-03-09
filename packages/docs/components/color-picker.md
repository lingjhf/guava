# ColorPicker

## 基础用法

<GColorPicker v-if="GColorPicker"></GColorPicker>

<script setup lang="ts">
import { onMounted, shallowRef, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
const GColorPicker = shallowRef<Component>()
onMounted(() => {
  GColorPicker.value = defineAsyncComponent(async () => {
    const res = await import('@lingjhf/guava-vue')
    return res.GColorPicker
  })
})
</script>

``` vue
<template>
  <GColorPicker></GColorPicker>
</template>

<script lang="ts" setup>
import { GColorPicker } from '@lingjhf/guava-vue'
</script>
```
