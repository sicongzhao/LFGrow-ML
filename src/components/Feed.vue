<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex-col flex max-w-xl mx-auto my-10">
        <!-- The publication thread -->
        <Post />
    </div>
  </div>
</template>

<script>
import Post from './Post.vue'

export default {
  name: 'Feed',
  components: {
    Post,
  }
}

</script>