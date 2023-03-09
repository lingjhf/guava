# Progress

## 基础用法

<GProgress v-if="GProgress" :percentage="50"></GProgress>

<script setup lang="ts">
import { onMounted, shallowRef, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
const GProgress = shallowRef<Component>()
onMounted(() => {
  GProgress.value = defineAsyncComponent(async () => {
    const res = await import('@lingjhf/guava-vue')
    return res.GProgress
  })
})
</script>

``` vue
<template>
    <GProgress :percentage="50"></GProgress>
</template>

<script lang="ts" setup>
import { GProgress } from '@lingjhf/guava-vue'
</script>
```
