<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import {RouterLink} from "vue-router";
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100vh;
}
</style>