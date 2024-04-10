<script lang="ts" setup>
import Post from './components/Post.vue'
import Posts from './components/Posts.vue'

definePage({
  name: 'VueQuery',
})

const visitedPosts = ref(new Set())
const isVisited = (id: number) => visitedPosts.value.has(id)

const postId = ref(-1)
function setPostId(id: number) {
  visitedPosts.value.add(id)
  postId.value = id
}
</script>

<template>
  <div class="flex h-96 flex-col">
    <h1>Vue Query - Basic</h1>
    <p>
      As you visit the posts below, you will notice them in a loading state the
      first time you load them. However, after you return to this list and click
      on any posts you have already visited again, you will see them load
      instantly and background refresh right before your eyes!
      <strong>
        (You may need to throttle your network speed to simulate longer loading
        sequences)
      </strong>
    </p>
    <Post v-if="postId > -1" :post-id="postId" @set-post-id="setPostId" />
    <Posts v-else :is-visited="isVisited" @set-post-id="setPostId" />
  </div>
</template>
