<template>
  <div class="flex w-full text-left text-sm px-2 py-3 rounded-lg shadow-[#106ae0] shadow-lg my-2" v-for="post in posts" :key="post">
      <div class="flex-none flex flex-col w-16">
          <div class="w-full h-4" v-if="post.__typename=='Mirror'"></div>
          <div class="w-12 h-12 mx-auto mt-1">
            <img :src="post.profile.picture.original.url" alt="" class="rounded-full">
          </div>
      </div>
      <div class="flex-auto flex flex-col">
          <div class="h-4 w-full flex justify-left items-end font-medium" v-if="post.__typename=='Mirror'">
            <div><span>{{post.profile.name}}</span> Mirrored</div>
          </div>
          <div v-if="post.__typename=='Mirror'">
            <div class="flex mt-2">
              <div>{{post.mirrorOf.profile.name}}</div>
              <div>{{'@'+post.mirrorOf.profile.handle}}</div>
              <div>·</div>
              <div>{{post.mirrorOf.createdAt.slice(0,10)}}</div>
              <div class="flex-1"></div>
              <div>Handle</div>
            </div>
            <div class="break-all">{{post.mirrorOf.metadata.content}}</div>
            <div class="w-11/12 rounded-xl mt-3">
              <img src="https://lh3.googleusercontent.com/NMJCEoRpLRJFY7tCXwQ3GXh3br5jwxbB8yNYsuTG5Yai2mUJlMCAaQ5ffagXP1E11E9wDl_sH7wbUbhjyTXZGkJIy8GIWVmzVgQJ=w600" class="rounded-xl" alt="">
            </div>
          </div>
          <div v-else>
            <div class="flex mt-2">
              <div>{{post.profile.name}}</div>
              <div>{{'@'+post.profile.handle}}</div>
              <div>·</div>
              <div>{{post.createdAt.slice(0,10)}}</div>
              <div class="flex-1"></div>
              <div>Handle</div>
            </div>
            <div class="break-all">{{post.metadata.content}}</div>
            <div class="flex w-11/12 rounded-xl border-solid border border-gray-200 mt-3 p-2" v-if="post.__typename=='Comment'">
              <div class="w-6 h-6 mr-2 mt-1 ml-1">
                <img :src="post.profile.picture.original.url" alt="" class="rounded-full">
              </div>
              
              <div class="flex-auto flex flex-col">
                <div class="h-6 flex justify-left items-end">
                  <div>{{post.mainPost.profile.name}}</div>
                  <div>{{'@'+post.mainPost.profile.handle}}</div>
                  <div>·</div>
                  <div>{{post.mainPost.createdAt.slice(0,10)}}</div>
                  <div class="flex-1"></div>
                </div>
                <div class="break-all">{{post.mainPost.metadata.content}}</div>
                <div class="w-11/12 rounded-lg mt-3">
                  <img src="https://lh3.googleusercontent.com/NMJCEoRpLRJFY7tCXwQ3GXh3br5jwxbB8yNYsuTG5Yai2mUJlMCAaQ5ffagXP1E11E9wDl_sH7wbUbhjyTXZGkJIy8GIWVmzVgQJ=w600" class="rounded-xl" alt="">
                </div>
              </div>
            </div>
          </div>
          
      </div>
  </div>
  <div></div>
</template>

<script>
export default {
  name: 'Post',
  computed: {
    posts () {
      return this.$store.getters.posts
    },
    testPost () {
      return this.$store.getters.posts[0]
    },
    filteredPosts () {
      return this.$store.getters.filteredPosts
    },
  },
  mounted () {
    
  }
}

</script>