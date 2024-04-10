<script lang="ts" setup>
import type { Post } from '../types'

defineProps({
  isVisited: {
    type: Function,
    required: true,
  },
})

defineEmits(['setPostId'])

definePage({
  name: 'posts',
})

async function fetcher(): Promise<Post[]> {
  return await fetch('https://jsonplaceholder.typicode.com/posts').then(response =>
    response.json(),
  )
}

const { isPending, isError, data, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetcher,
})
</script>

<template>
  <div class="flex h-96 flex-col">
    <h1>Posts</h1>
    <div v-if="isPending">
      Loading...
    </div>
    <div v-else-if="isError">
      An error has occurred: {{ error }}
    </div>
    <div v-else-if="data" class="min-h-0 flex-1 overflow-auto">
      <ul>
        <li v-for="item in data" :key="item.id">
          <a
            href="#"
            :class="isVisited(item.id) ? 'font-semibold text-green-500' : 'text-sky-500'"
            @click="$emit('setPostId', item.id)"
          >{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
