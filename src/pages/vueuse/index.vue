<script setup lang="ts">
import type { UseMouseEventExtractor } from '@vueuse/core'

definePage({
  name: 'VueUse',
})

const divRef = ref<HTMLDivElement | null>(null)

const mouseDefault = reactive(useMouse())

const extractor: UseMouseEventExtractor = (event) => {
  if (typeof Touch !== 'undefined' && event instanceof Touch)
    return null
  else
    return [(event as MouseEvent).offsetX, (event as MouseEvent).offsetY]
}

const mouseWithExtractor = reactive(useMouse({ target: divRef, type: extractor }))
</script>

<template>
  <div ref="divRef" class="flex flex-col gap-y-4 bg-gray-50 p-4">
    <p>Basic Usage</p>
    <div class="min-h-0 flex-1">
      <p>x: {{ mouseDefault.x }}</p>
      <p>y: {{ mouseDefault.y }}</p>
      <p>sourceType: {{ mouseDefault.sourceType }}</p>
    </div>
    <p>Extractor Usage</p>
    <div class="min-h-0 flex-1">
      <p>x: {{ mouseWithExtractor.x }}</p>
      <p>y: {{ mouseWithExtractor.y }}</p>
      <p>sourceType: {{ mouseWithExtractor.sourceType }}</p>
    </div>
  </div>
</template>
