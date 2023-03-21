# VirtualScroll

## 基础用法

<div style="width: 300px; height: 300px">
  <GVirtualScroll v-if="GVirtualScroll && GVirtualScrollColumn">
    <div style="width: 100%">
        <GVirtualScrollColumn  :items="items">
        <template #renderItem="{ key }">
            <div style="background-color: skyblue; height: 100%; box-sizing: border-box; border-bottom: 2px solid #fff;">
              {{ key }}
            </div>
        </template>
      </GVirtualScrollColumn>
    </div>
  </GVirtualScroll>
</div>

<script setup lang="ts">
import { onMounted, shallowRef, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
const GVirtualScroll = shallowRef<Component>()
const GVirtualScrollColumn = shallowRef<Component>()
const items = [...Array(10000).keys()].map((item) => ({ key: `${item}`, value: 50 }))
onMounted(() => {
  GVirtualScroll.value = defineAsyncComponent(async () => {
    const res = await import('@lingjhf/guava-vue')
    return res.GVirtualScroll
  })
  GVirtualScrollColumn.value = defineAsyncComponent(async () => {
    const res = await import('@lingjhf/guava-vue')
    return res.GVirtualScrollColumn
  })
})
</script>

``` vue
<template>
  <div style="width: 300px; height: 300px">
    <g-virtual-scroll @scrollChange="change">
      <div style="width: 100%">
        <g-virtual-scroll-column :items="items">
          <template #renderItem="{ key }">
            <div>{{ key }}</div>
          </template>
        </g-virtual-scroll-column>
      </div>
    </g-virtual-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GVirtualScroll, GVirtualScrollColumn } from '@lingjhf/guava-vue'

const items = ref([...Array(10000).keys()].map((item) => ({ key: `${item}`, value: 50 })))
</script>

```
