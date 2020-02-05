// Single File Components

<template>
  <div id="app">
    <!-- Component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 10px;
}

* {
  box-sizing: border-box;
}
</style>
