<template>
  <div class="flex w-full text-left text-sm px-2 py-3 rounded-lg shadow-[#106ae0] shadow-ct my-1 bg-white" v-for="post in filteredPosts" :key="post">
      <div class="flex-none flex flex-col w-16">
          <div class="w-full h-4" v-if="post.__typename=='Mirror'"></div>
          <div class="w-12 h-12 mx-auto mt-1">
            <img :src="post.profile.picture.original.url" alt="" class="w-12 h-12 rounded-full object-cover" @error="$event.target.src = defaultAvatar">
          </div>
      </div>
      <div class="flex-auto flex flex-col">
          <div class="h-4 w-full flex justify-left items-end font-bold" v-if="post.__typename=='Mirror'">
            <div><span>{{post.profile.name}}</span> Mirrored</div>
          </div>
          <div v-if="post.__typename=='Mirror'">
            <div class="flex mt-2">
              <div class="font-bold mr-1" v-if="post.mirrorOf.profile.name">{{post.mirrorOf.profile.name}}</div>
              <div class="font-bold text-gray-400" v-if="post.mirrorOf.profile.handle">{{'@'+post.mirrorOf.profile.handle}}</div>
              <div class="font-bold text-gray-400 mx-2">·</div>
              <div class="font-medium text-gray-400">{{post.mirrorOf.createdAt.slice(5,10)}}</div>
              <div class="flex-1"></div>
              <div class="w-6 h-6 rounded-full cursor-pointer relative">
                <img class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/dot.svg" alt="" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                <div class="w-40 h-6 absolute rounded-md top-0 right-0" v-show="showByIndex === post.id" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                  <span class="relative w-40 z-0 h-6 inline-flex shadow-sm rounded-md">
                    <button type="button" class="relative w-24 inline-flex items-center px-4 py-2 rounded-l-md border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">Show more</button>
                    <button type="button" class="-ml-px w-16 relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">Hide</button>
                  </span>
                </div>
              </div>
            </div>
            <div class="break-words font-medium pr-10">{{post.mirrorOf.metadata.content}}</div>
            <div class="w-11/12 rounded-xl mt-3" v-if="post.mirrorOf.metadata.length>0">
              <img src="https://lh3.googleusercontent.com/NMJCEoRpLRJFY7tCXwQ3GXh3br5jwxbB8yNYsuTG5Yai2mUJlMCAaQ5ffagXP1E11E9wDl_sH7wbUbhjyTXZGkJIy8GIWVmzVgQJ=w600" class="rounded-xl" alt="">
            </div>
          </div>
          <div v-else>
            <div class="flex mt-2">
              <div class="font-bold mr-1" v-if="post.profile.name">{{post.profile.name}}</div>
              <div class="font-bold text-gray-400" v-if="post.profile.handle">{{'@'+post.profile.handle}}</div>
              <div class="font-bold text-gray-400 mx-2">·</div>
              <div class="font-medium text-gray-400">{{post.createdAt.slice(5,10)}}</div>
              <div class="flex-1"></div>
              <div class="w-6 h-6 rounded-full cursor-pointer relative -top-2">
                <img class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/dot.svg" alt="" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                <div class="w-40 h-6 absolute rounded-md top-0 right-0" v-show="showByIndex === post.id" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                  <span class="relative w-40 z-0 h-6 inline-flex shadow-sm rounded-md">
                    <button type="button" class="relative w-24 inline-flex items-center px-4 py-2 rounded-l-md border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">Show more</button>
                    <button type="button" class="-ml-px w-16 relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">Hide</button>
                  </span>
                </div>
              </div>
            </div>
            <div class="break-words font-medium pr-10">{{post.metadata.content}}</div>
            <div class="flex w-11/12 rounded-xl border-solid border-2 border-gray-50 bg-gray-50 mt-3 p-2" v-if="post.__typename=='Comment'">
              <div class="flex-none w-5 h-5 mr-2 mt-1 ml-1 mb-1">
                <img :src="post.mainPost.profile.picture.original.url" alt="" class="w-5 h-5 rounded-full object-cover" @error="$event.target.src = defaultAvatar">
              </div>
              <div class="flex-auto flex flex-col">
                <div class="h-6 flex justify-left items-end">
                  <div class="font-bold mr-1" v-if="post.mainPost.profile.name">{{post.mainPost.profile.name}}</div>
                  <div class="font-bold text-gray-400" v-if="post.mainPost.profile.handle">{{'@'+post.mainPost.profile.handle}}</div>
                  <div class="font-bold text-gray-400 mx-2">·</div>
                  <div class="font-medium text-gray-400">{{post.mainPost.createdAt.slice(5,10)}}</div>
                  <div class="flex-1"></div>
                </div>
                <div class="break-all font-medium pr-4 pb-1" v-if="post.mainPost.metadata.content">{{post.mainPost.metadata.content}}</div>
                <div class="w-11/12 rounded-lg mt-3" v-if="post.mainPost.metadata.length>0">
                  <img src="https://lh3.googleusercontent.com/NMJCEoRpLRJFY7tCXwQ3GXh3br5jwxbB8yNYsuTG5Yai2mUJlMCAaQ5ffagXP1E11E9wDl_sH7wbUbhjyTXZGkJIy8GIWVmzVgQJ=w600" class="rounded-xl" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="flex mt-3 mb-1">
            <div class="flex-auto flex align-middle justify-leftˆ items-center">
              <img class="block w-4" src="../assets/icons/like.svg" alt="">
              <div class="leading-4 ml-1 text-xs">{{post.stats.totalAmountOfCollects>0?post.stats.totalAmountOfCollects:null}}</div>
            </div>
            <div class="flex-auto flex align-middle">
              <img class="h-4" src="../assets/icons/mirror.svg" alt="">
              <div class="h-4 leading-4 text-xs">{{post.stats.totalAmountOfMirrors>0?post.stats.totalAmountOfMirrors:null}}</div>
            </div>
            <div class="flex-auto flex align-middle">
              <img class="h-4" src="../assets/icons/comment.svg" alt="">
              <div class="h-4 leading-4 text-xs">{{post.stats.totalAmountOfComments>0?post.stats.totalAmountOfComments:null}}</div>
            </div>
            <div class="flex-auto flex align-middle">
              <img class="h-4" src="../assets/icons/share.svg" alt="">
            </div>
        </div>
      </div>
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Post',
  data(){
     return{
          showByIndex: null,
      }
  },
  computed: {
    ...mapGetters([
      'posts',
      'filteredPosts',
      'defaultAvatar'
    ]),
  },
  methods: {
    
  },
  mounted () {
    
  }
}

</script>