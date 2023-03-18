# VirtualScroll

## 基础用法

<div style="width: 300px; height: 300px">
  <GVirtualScroll v-if="GVirtualScroll" :items="items">
    <template #renderItem="{ key }">
      <div style="background-color: skyblue; height: 100%;box-sizing: border-box; border-bottom: 2px solid #fff;">
        {{ key }}
      </div>
    </template>
  </GVirtualScroll>
</div>

<script setup lang="ts">
import { onMounted, shallowRef, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
const GVirtualScroll = shallowRef<Component>()
const items = [...Array(10000).keys()].map((item) => ({ key: `${item}`, value: 50 }))
onMounted(() => {
  GVirtualScroll.value = defineAsyncComponent(async () => {
    const res = await import('@lingjhf/guava-vue')
    return res.GVirtualScroll
  })
})
</script>

``` vue
<template>
  <div style="width: 300px; height: 300px">
    <GVirtualScroll :items="items">
      <template #renderItem="{ key }">
        <div style="background-color: skyblue; height: 100%;box-sizing: border-box; border-bottom: 2px solid #fff;">
          {{ key }}
        </div>
      </template>
    </GVirtualScroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GVirtualScroll } from '@lingjhf/guava-vue'

const items = ref([...Array(10000).keys()].map((item) => ({ key: `${item}`, value: 50 })))
</script>

```
