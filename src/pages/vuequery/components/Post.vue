<script lang="ts" setup>
import type { Post } from '../types'

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
})

defineEmits(['setPostId'])

definePage({
  name: 'post',
})

async function fetcher(id: number): Promise<Post> {
  return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
    response => response.json(),
  )
}

const { isPending, isError, isFetching, data, error } = useQuery({
  queryKey: ['post', props.postId],
  queryFn: () => fetcher(props.postId),
})
</script>

<template>
  <h1>Post {{ postId }}</h1>
  <a href="#" @click="$emit('setPostId', -1)"> Back </a>
  <div v-if="isPending" class="update">
    Loading...
  </div>
  <div v-else-if="isError">
    An error has occurred: {{ error }}
  </div>
  <div v-else-if="data">
    <h1>{{ data.title }}</h1>
    <div>
      <p>{{ data.body }}</p>
    </div>
    <div v-if="isFetching" class="font-semibold text-green-500">
      Background Updating...
    </div>
  </div>
</template>
