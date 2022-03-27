<template>
  <div class="flex w-full text-left text-sm px-2 py-3 rounded-lg shadow-[#106ae0] shadow-ct my-1 bg-white" v-for="(post, index) in filteredPosts" :key="post">
      <div class="flex-none flex flex-col w-16">
          <div class="w-full h-4" v-if="post.__typename=='Mirror'"></div>
          <div class="w-12 h-12 mx-auto mt-1">
            <img :src="post.profile.picture.original.url" alt="" class="w-12 h-12 rounded-full object-cover" @error="$event.target.src = defaultAvatar" v-if="post.profile.picture !== null && post.profile.picture.hasOwnProperty('original')">
            <img :src="defaultAvatar" alt="" class="w-12 h-12 rounded-full object-cover" v-else>
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
                <!-- <img @click="unLikePost(post.id)" v-if="likedPostIds.includes(post.id)" class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/liked.svg" alt=""> -->
                <!-- <img class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/dot.svg" alt="" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null"> -->
                <img @click="unLikePost(post.id)" v-if="likedPostIds.includes(post.id)" class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/liked.svg" alt="">
                <img v-else-if="post.recScore > 0.51 && modelStatus.model2.active" class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/recommend.svg" alt="" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                <img v-else class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/dot.svg" alt="" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                <div class="w-24 h-6 absolute rounded-md top-0 right-0" v-show="showByIndex === post.id" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                  <span class="relative w-24 z-0 h-6 inline-flex shadow-sm rounded-md">
                    <button @click="likePost(post.id)"  type="button" class="relative w-12 inline-flex items-center px-4 py-2 rounded-l-md border border-gray-200 bg-white hover:bg-gray-50">
                      <img class="w-4 mx-auto" src="../assets/icons/like.svg" alt="">
                    </button>
                    <button @click="mutePost(post.id, index)" type="button" class="-ml-px w-12 relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-200 bg-white hover:bg-gray-50 ">
                      <img class="w-4 mx-auto" src="../assets/icons/hide.svg" alt="">
                    </button>
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
                <img @click="unLikePost(post.id)" v-if="likedPostIds.includes(post.id)" class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/liked.svg" alt="">
                <img v-else-if="post.recScore > 0.51 && modelStatus.model2.active" class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/recommend.svg" alt="" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                <img v-else class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/dot.svg" alt="" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                <div class="w-24 h-6 absolute rounded-md top-0 right-0" v-show="showByIndex === post.id" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                  <span class="relative w-24 z-0 h-6 inline-flex shadow-sm rounded-md">
                    <button @click="likePost(post.id)" type="button" class="relative w-12 inline-flex items-center px-4 py-2 rounded-l-md border border-gray-200 bg-white hover:bg-gray-50">
                      <img class="w-4 mx-auto" src="../assets/icons/like.svg" alt="">
                    </button>
                    <button @click="mutePost(post.id, index)" type="button" class="-ml-px w-12 relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-200 bg-white hover:bg-gray-50 ">
                      <img class="w-4 mx-auto" src="../assets/icons/hide.svg" alt="">
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div class="break-words font-medium pr-10">{{post.metadata.content}}</div>
            <div class="flex w-11/12 rounded-xl border-solid border-2 border-gray-50 bg-gray-50 mt-3 p-2" v-if="post.__typename=='Comment'">
              <div class="flex-none w-5 h-5 mr-2 mt-1 ml-1 mb-1">
                <img :src="post.mainPost.profile.picture.original.url" alt="" class="w-5 h-5 rounded-full object-cover" @error="$event.target.src = defaultAvatar" v-if="post.mainPost.profile.picture !== null && post.mainPost.profile.picture.hasOwnProperty('original')">
                <img :src="defaultAvatar" alt="" class="w-5 h-5 rounded-full object-cover" v-else>
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
              <img class="block w-4" src="../assets/icons/collection.svg" alt="">
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
  <div v-if="hiddenPosts.length > 0">
    <div class="flex w-full text-left text-sm px-2 py-3 rounded-lg shadow-[#106ae0] shadow-ct my-1 text-gray-500 text-bold bg-gray-200" v-if="!showHidden">{{hiddenPosts.length}} hidden publication(s). <span class="text-blue-500 cursor-pointer" @click="showHidden=true">&nbsp;Click&nbsp;</span> to learn more.</div>
    <div class="flex w-full text-left text-sm px-2 py-3 rounded-lg shadow-[#106ae0] shadow-ct my-1 text-gray-500 text-bold bg-gray-200" v-if="showHidden"><span class="text-blue-500 cursor-pointer" @click="showHidden=false">&nbsp;Click&nbsp;</span> to turn off hidden posts.</div>
    <!-- It makes sense to show the hidden posts if users requested.  -->
  </div>
  <div v-if="showHidden">
  <div class="flex flex-col bg-theme-color-3 my-1 rounded-lg shadow-[#106ae0]" v-for="(post, index) in hiddenPosts" :key="post">
    <div class="h-8 text-white text-xs text-left px-3 flex justify-between items-center">
      <div>{{post.reasons[0]}}</div>
      <button class="bg-white rounded-sm text-gray-500 text-xs font-bold px-2 h-6" @click="errorCase(index)">Unhide</button>
    </div>
    <div class="flex w-full text-left text-sm px-2 py-3 rounded-lg shadow-[#106ae0] shadow-ct bg-gray-200">
      <div class="flex-none flex flex-col w-16">
          <div class="w-full h-4" v-if="post.__typename=='Mirror'"></div>
          <div class="w-12 h-12 mx-auto mt-1">
            <img :src="post.profile.picture.original.url" alt="" class="w-12 h-12 rounded-full object-cover" @error="$event.target.src = defaultAvatar" v-if="post.profile.picture !== null && post.profile.picture.hasOwnProperty('original')">
            <img :src="defaultAvatar" alt="" class="w-12 h-12 rounded-full object-cover" v-else>
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
              <!-- <div class="w-6 h-6 rounded-full cursor-pointer relative">
                <img class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/dot.svg" alt="" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                <div class="w-24 h-6 absolute rounded-md top-0 right-0" v-show="showByIndex === post.id" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                  <span class="relative w-24 z-0 h-6 inline-flex shadow-sm rounded-md">
                    <button @click="likePost(post.id)"  type="button" class="relative w-12 inline-flex items-center px-4 py-2 rounded-l-md border border-gray-200 bg-white hover:bg-gray-50">
                      <img class="w-4 mx-auto" src="../assets/icons/like.svg" alt="">
                    </button>
                    <button @click="mutePost(post.id)" type="button" class="-ml-px w-12 relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-200 bg-white hover:bg-gray-50 ">
                      <img class="w-4 mx-auto" src="../assets/icons/hide.svg" alt="">
                    </button>
                  </span>
                </div>
              </div> -->
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
              <!-- <div class="w-6 h-6 rounded-full cursor-pointer relative -top-2">
                <img class="mx-auto mt-1 w-4 h-4 fill-current text-blue-500" src="../assets/icons/dot.svg" alt="" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                <div class="w-24 h-6 absolute rounded-md top-0 right-0" v-show="showByIndex === post.id" @mouseover="showByIndex = post.id" @mouseout="showByIndex = null">
                  <span class="relative w-24 z-0 h-6 inline-flex shadow-sm rounded-md">
                    <button @click="likePost(post.id)" type="button" class="relative w-12 inline-flex items-center px-4 py-2 rounded-l-md border border-gray-200 bg-white hover:bg-gray-50">
                      <img class="w-4 mx-auto" src="../assets/icons/like.svg" alt="">
                    </button>
                    <button @click="mutePost(post.id)" type="button" class="-ml-px w-12 relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-200 bg-white hover:bg-gray-50 ">
                      <img class="w-4 mx-auto" src="../assets/icons/hide.svg" alt="">
                    </button>
                  </span>
                </div>
              </div> -->
            </div>
            <div class="break-words font-medium pr-10">{{post.metadata.content}}</div>
            <div class="flex w-11/12 rounded-xl border-solid border-2 border-gray-300 bg-gray-300 mt-3 mb-2 p-2" v-if="post.__typename=='Comment'">
              <div class="flex-none w-5 h-5 mr-2 mt-1 ml-1 mb-1">
                <img :src="post.mainPost.profile.picture.original.url" alt="" class="w-5 h-5 rounded-full object-cover" @error="$event.target.src = defaultAvatar" v-if="post.mainPost.profile.picture !== null && post.mainPost.profile.picture.hasOwnProperty('original')">
                <img :src="defaultAvatar" alt="" class="w-5 h-5 rounded-full object-cover" v-else>
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
          <!-- <div class="flex mt-3 mb-1">
            <div class="flex-auto flex align-middle justify-leftˆ items-center">
              <img class="block w-4" src="../assets/icons/collection.svg" alt="">
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
        </div> -->
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
          showHidden: false,
          // muteErrInfo: 'You hide this publication.'
      }
  },
  computed: {
    ...mapGetters([
      'muteErrInfo',
      'posts',
      'filteredPosts',
      'hiddenPosts',
      'likedPostIds',
      'mutedPostIds',
      'newTrainPostIds',
      'defaultAvatar',
      'modelStatus',
    ]),
  },
  methods: {
    async updateModelStatusValue(modelId, key, value){
      await this.$store.dispatch('updateModelStatusValue', [modelId, key, value])
    },
    storeLikedPostIds(){
      localStorage.setItem('likedPostIds_',JSON.stringify(this.likedPostIds))
    },
    storeMutedPostIds(){
      localStorage.setItem('mutedPostIds_',JSON.stringify(this.mutedPostIds))
    },
    storeNewTrainPostIds(){
      localStorage.setItem('newTrainPostIds_',JSON.stringify(this.newTrainPostIds))
    },
    likePost (postId) {
      this.showByIndex = null
      this.model2OutDated()
      if (!this.likedPostIds.includes(postId)) {
        this.likedPostIds.push(postId)
      }
      this.storeLikedPostIds()
      if (!this.newTrainPostIds.includes(postId)) {
        this.newTrainPostIds.push(postId)
      }
      this.storeNewTrainPostIds()
      // console.log(this.likedPostIds)
    },
    unLikePost (postId) {
      this.showByIndex = postId
      this.model2OutDated()
      const idx = this.likedPostIds.indexOf(postId)
      if (idx > -1) {
        this.likedPostIds.splice(idx,1)
      }
      this.storeLikedPostIds()
      // console.log(this.likedPostIds)
      const idx2 = this.newTrainPostIds.indexOf(postId)
      if (idx2 > -1) {
        this.newTrainPostIds.splice(idx2,1)
      }
      this.storeNewTrainPostIds()
    },
    mutePost (postId, postIdx) {
      this.showByIndex = null
      this.model2OutDated()
      if (!this.mutedPostIds.includes(postId)) {
        this.mutedPostIds.push(postId)
      }
      this.storeMutedPostIds()
      if (!this.newTrainPostIds.includes(postId)) {
        this.newTrainPostIds.push(postId)
      }
      this.storeNewTrainPostIds()
      // console.log(this.mutedPostIds)
      // console.log(postId, postIdx)
      if ('reasons' in this.filteredPosts[postIdx] && Array.isArray(this.filteredPosts[postIdx].reasons)){
        this.filteredPosts[postIdx].reasons = [this.muteErrInfo]
      } else {
        // console.log(666)
        // console.log(this.filteredPosts[postIdx])
        this.filteredPosts[postIdx].reasons = [this.muteErrInfo]
      }
      this.hiddenPosts.push(this.filteredPosts[postIdx])
      this.filteredPosts.splice(postIdx, 1)
    },
    errorCase(postIdx) {
      if (this.hiddenPosts[postIdx].reasons != this.muteErrInfo) {
        alert('This is input and will be used to train the model.')
      }
      console.log(postIdx)
      console.log(this.hiddenPosts[postIdx].reasons)
      console.log(typeof(this.hiddenPosts[postIdx].reasons))
      if (Array.isArray(this.hiddenPosts[postIdx].reasons)){
        const idx = this.hiddenPosts[postIdx].reasons.indexOf(this.muteErrInfo)
        if (idx > -1) {
          this.hiddenPosts[postIdx].reasons.splice(idx,1)
          this.model2OutDated()
        }
      }
      // const idx = this.hiddenPosts[postIdx].reasons.indexOf(this.muteErrInfo)
      console.log(this.hiddenPosts[postIdx].reasons)
      // this.hiddenPosts[postIdx]
      const idx = this.mutedPostIds.indexOf(this.hiddenPosts[postIdx].id)
      if (idx > -1) {
        this.mutedPostIds.splice(idx,1)
      }
      const idx2 = this.newTrainPostIds.indexOf(this.hiddenPosts[postIdx].id)
      if (idx > -1) {
        this.newTrainPostIds.splice(idx2,1)
      }
      this.filteredPosts.push(this.hiddenPosts[postIdx])
      this.hiddenPosts.splice(postIdx, 1)
      this.storeMutedPostIds()
      this.storeNewTrainPostIds()
    },
    model2OutDated() {
      // this.modelStatus.model2.upToDate = false
      this.updateModelStatusValue('model2', 'upToDate', false)
    }
    // showHidden () {

    // }
  },
  mounted () {
    
  }
}

</script>