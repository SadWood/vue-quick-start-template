<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>
    <h1 class="font-medium text-[2.6rem] relative -top-2.5 lg:text-left text-center no-underline transition duration-400 p-[3px] text-[#00BD7E]">
      {{ msg }}
    </h1>
    <h3 class="lg:text-left text-center text-[1.2rem]">
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>
