<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div class="flex-col flex max-w-xl mx-auto my-0">
        <div class="text-left text-2xl font-bold p-4">
            Feed
        </div>
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