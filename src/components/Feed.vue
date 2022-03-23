<template>
  <div class="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="w-44 min-w-fit flex-auto">
        <div class="fixed flex-auto w-44 p-3">
            <img class="w-10" src="../assets/logo.svg" alt="">
            <div class="inline-flex h-10 w-full justify-items-start items-center py-1 my-1 mt-10 pl-5 -ml-9 text-xl text-theme-color-1 font-bold rounded-full hover:bg-gray-100 cursor-pointer">
                Home
            </div>
            <div class="inline-flex h-10 w-full justify-items-start items-center py-1 my-1 pl-5 -ml-9 text-xl font-bold rounded-full hover:bg-gray-100 cursor-pointer">
                Explore
            </div>
            <div class="inline-flex h-10 w-full justify-items-start items-center py-1 my-1 pl-5 -ml-9 text-xl font-bold rounded-full hover:bg-gray-100 cursor-pointer">
                More
            </div>
        </div>
    </div>
    <div class="flex-col flex max-w-xl my-0">
        <div class="text-left text-xl font-bold p-4 mt-1">
            Feed
        </div>
        <!-- The publication thread -->
        <Post />
    </div>
    <div class="max-w-lg min-w-fit w-96 flex-auto">
        <div class="fixed max-w-lg min-w-fit w-96 flex-auto">
            <div class="w-full sm:max-w-xs mt-3 mx-auto">
                <label for="Search" class="sr-only">Search</label>
                <input type="text" class="h-9 shadow-ct ring-0 border-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm ring-gray-100 rounded-lg pl-3" placeholder="   Search" />
            </div>
            <div class="w-full flex-col flex items-center shadow-ct sm:max-w-xs mt-5 mx-auto py-3 bg-white rounded-lg">
                <div class="flex text-left w-full px-4 py-1 pb-2 font-bold">Models</div>
                <div class="w-11/12 rounded-lg">
                    <SwitchGroup as="div" class="flex items-center text-left justify-between p-3 my-2 bg-gray-100 rounded-lg">
                        <span class="flex-grow flex flex-col">
                        <SwitchLabel as="span" class="text-sm font-medium text-gray-900" passive>Toxicity Filter</SwitchLabel>
                        <SwitchDescription as="span" class="text-sm text-gray-500">Detect toxic posts and remove them from your feed.</SwitchDescription>
                        </span>
                        <Switch v-model="enabled_1" :class="[enabled_1 ? 'bg-theme-color-1' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-color-1']">
                        <span aria-hidden="true" :class="[enabled_1 ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                        </Switch>
                    </SwitchGroup>

                    <SwitchGroup as="div" class="flex items-center text-left justify-between p-3 my-2 bg-gray-100 rounded-lg">
                        <span class="flex-grow flex flex-col">
                        <SwitchLabel as="span" class="text-sm font-medium text-gray-900" passive>Similarity Aggregator</SwitchLabel>
                        <SwitchDescription as="span" class="text-sm text-gray-500">Group similar posts, improve your reading experience.</SwitchDescription>
                        </span>
                        <Switch v-model="enabled_2" :class="[enabled_2 ? 'bg-theme-color-1' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-color-1']">
                        <span aria-hidden="true" :class="[enabled_2 ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
                        </Switch>
                    </SwitchGroup>
                    
                </div>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import Post from './Post.vue'
import { ref } from 'vue'
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'

export default {
  name: 'Feed',
  components: {
    Post,
    Switch,
    SwitchDescription,
    SwitchGroup,
    SwitchLabel,
  },
  setup() {
    const enabled_1 = ref(false)
    const enabled_2 = ref(false)

    return {
      enabled_1,
      enabled_2,
    }
  },
  mounted () {
      console.log(ref)
  }
}

</script>