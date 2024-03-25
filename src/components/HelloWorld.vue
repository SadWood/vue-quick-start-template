<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h1 class="relative -top-2.5 p-[3px] text-center text-[2.6rem] font-medium text-[#00BD7E] no-underline transition duration-400 lg:text-left">
      {{ msg }}
    </h1>
    <h3 class="text-center text-[1.2rem] lg:text-left">
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>
