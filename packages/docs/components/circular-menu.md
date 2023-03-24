# CircularMenu

## 基础用法

<div style="width: 250px; height: 250px; position: relative">
  <GCircularMenu v-if="GCircularMenu" :menus="menus" :menuWidth="48">
    <template #renderItem="{ key }"> {{ key }} </template>
  </GCircularMenu>
</div>

<script setup lang="ts">
import { onMounted, shallowRef, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
const GCircularMenu = shallowRef<Component>()

const menus = [
  {
    key: '1',
    precentage: 20,
    children: [
      { key: '1-1', precentage: 20 },
      { key: '1-2', precentage: 20 },
      { key: '1-3', precentage: 20 },
      { key: '1-4', precentage: 20 },
    ],
  },
  { key: '2', precentage: 20 },
  { key: '3', precentage: 20 },
  { key: '4', precentage: 20 },
  { key: '5', precentage: 20 },
]

onMounted(() => {
  GCircularMenu.value = defineAsyncComponent(async () => {
    const res = await import('@lingjhf/guava-vue')
    return res.GCircularMenu
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
