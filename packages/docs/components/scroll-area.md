# ScrollArea

## 基础用法

<div class="container">
  <GScrollArea v-if="GScrollArea">
    <p v-for="i in 100">Guava {{ i }}</p>
  </GScrollArea>
</div>

<script setup lang="ts">
import { onMounted, shallowRef, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
const GScrollArea = shallowRef<Component>()
onMounted(() => {
  GScrollArea.value = defineAsyncComponent(async () => {
    const res = await import('@lingjhf/guava-vue')
    return res.GScrollArea
  })
})
</script>

<style scoped>
.container {
  text-align: center;
  width: 300px;
  height: 200px;
}
</style>

``` vue
<template>
  <div class="width:300px;height:200px;">
    <GScrollArea >
      <p v-for="i in 100">Guava {{ i }}</p>
    </GScrollArea>
  </div>
</template>

<script lang="ts" setup>
import { GScrollArea } from '@lingjhf/guava-vue'
</script>
```
