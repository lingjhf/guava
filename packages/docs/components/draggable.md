# Draggable

## 基础用法

<div class="container">
  <GDraggable v-if="GDraggable">
    <div class="draggable"></div>
  </GDraggable>
</div>

<script setup lang="ts">
import { onMounted, shallowRef, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
const GDraggable = shallowRef<Component>()
onMounted(() => {
  GDraggable.value = defineAsyncComponent(async () => {
    const res = await import('@lingjhf/guava-vue')
    return res.GDraggable
  })
})
</script>

<style scoped>
.container {
  background-color: rgba(255, 255, 255, 0.1);
  position: relative;
  width: 400px;
  height: 300px;
  z-index: 10;
  overflow: hidden;
}
.draggable {
  z-index: 10;
  width: 100px;
  height: 100px;
  background-color: cadetblue;
}
</style>

``` vue
<template>
  <GDraggable>
    <div styles=" width: 100px;height: 100px;background-color: cadetblue;"></div>
  </GDraggable>
</template>

<script lang="ts" setup>
import { GDraggable } from '@lingjhf/guava-vue'
</script>
```
