<template>
  <div class="logo">
    <img class="image" alt="Vue logo" src="./assets/logo.svg" />
  </div>

  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 120px;
}
.image {
  width: 150px;
  height: 150px;
}
.logo {
  text-align: center;
}
</style>
