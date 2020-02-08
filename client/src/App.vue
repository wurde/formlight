// Single File Components

<template>
  <div id="app">
    <transition name="router-anim">
      <!-- Component matched by the route will render here -->
      <router-view></router-view>
    </transition>
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

.page {
  position: fixed;
  width: inherit;
}
</style>

<style scoped>
.router-anim-enter-active {
  animation: fadeInDown 1s;
  animation-duration: 0.7s;
}
.router-anim-leave-active {
  animation: fadeOutDown 1s;
  animation-duration: 0.3s;
}
</style>
