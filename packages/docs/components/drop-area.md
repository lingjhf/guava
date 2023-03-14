# DropArea

## 基础用法

<div v-if="GDropArea" style="width: 300px">
  <GDropArea :items="[1, 2, 3, 4, 5, 6]">
    <template #dropItem="{ item }">
      <div
        style="
          background-color: skyblue;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        {{ item }}
      </div>
    </template>
  </GDropArea>
</div>

<script setup lang="ts">
import { onMounted, shallowRef, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
const GDropArea = shallowRef<Component>()
onMounted(() => {
  GDropArea.value = defineAsyncComponent(async () => {
    const res = await import('@lingjhf/guava-vue')
    return res.GDropArea
  })
})
</script>

``` vue
<template>
  <div style="width: 300px">
    <GDropArea :items="items">
      <template #dropItem="{ item }">
        <div
          style="
            background-color: skyblue;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          {{ item }}
        </div>
      </template>
    </GDropArea>
  </div>
</template>

<script lang="ts" setup>
import { GDropArea } from '@lingjhf/guava-vue'

const items = [1, 2, 3, 4, 5, 6]
</script>
```
