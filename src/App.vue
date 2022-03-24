<template>
  <!-- <div class="bg-fixed bg-no-repeat bg-cover" style="background-image: url('https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1041&q=80')"> -->
  <div class="bg-gray-50 min-h-screen	max-h-screen overflow-y-auto">
    <HelloWorld />
    <Feed />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Feed from './components/Feed.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Feed,
  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
