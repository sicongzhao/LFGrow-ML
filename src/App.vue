<template>
  <HelloWorld />
  <Feed />

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
