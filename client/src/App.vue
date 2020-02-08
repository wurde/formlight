// Single File Components

<template>
  <div id="app">
    <transition name="router-anim"
                @beforeLeave="beforeLeave"
                @enter="enter"
                @afterEnter="afterEnter">
      <!-- Component matched by the route will render here -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      prevHeight: 0,
    };
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
  },
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

.text-error {
  color: red;
}
</style>

<style scoped>
.router-anim-enter-active {
  animation: fadeInDown 1s;
  animation-duration: 1s;
}
.router-anim-leave-active {
  animation: fadeOutDown 1s;
  animation-duration: 0.4s;
}
</style>
