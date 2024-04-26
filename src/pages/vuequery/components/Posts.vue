<script lang="ts" setup>
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

async function fetcher(page: Ref<number>) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page.value}&_limit=10`,
  )
  return await response.json()
}

const page = ref(1)
const { isPending, isError, data, error, isPlaceholderData }
  = useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetcher(page),
    placeholderData: keepPreviousData,
    // gcTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  })
function prevPage() {
  page.value = Math.max(page.value - 1, 1)
}
function nextPage() {
  if (!isPlaceholderData.value)
    page.value = Math.min(page.value + 1, 10)
}
</script>

<template>
  <div class="flex h-96 flex-col">
    <h1>Posts</h1>
    <p>Current Page: {{ page }} | Previous data: {{ isPlaceholderData }}</p>
    <button @click="prevPage">
      Prev Page
    </button>
    <button @click="nextPage">
      Next Page
    </button>
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