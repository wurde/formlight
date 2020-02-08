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

button {
  background-color: #FFF;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  border: none;
}

input {
  width: 100%;
  height: 2em;
  padding: 15px;
  margin: 10px 0px;
  border-radius: 5px;
  border: 1px solid #CBDBEA;
  font-size: 18px;
  outline: none;
}

input:focus {
  box-shadow: 0 3px 15px #CBDBEA;
}

label {
  font-weight: bold;
}

nav {
  margin: 20px 0px;
}

a {
  text-decoration: underline;
  cursor: pointer;
  padding: 10px 16px;
  padding-left: 0px;
  outline: none;
}

a:focus, a:hover {
  text-shadow: 0 5px 30px #EEC480;
}

.text-error {
  color: red;
}

.form-section {
  padding: 15px;
}

.errors {
  color: red;
  font-weight: bold;
  padding-bottom: 10px;
}

.alert {
  color: #007149;
  font-weight: bold;
  padding-bottom: 10px;
}

.text-danger {
  color: red;
}
.input-danger {
  border: 1px solid red;
}
.input-danger:focus {
  box-shadow: 0 1px 5px red;
}

.btn-add {
  border: 1px solid #7FB8A4;
  color: #7FB8A4;
}
.btn-add:focus, .btn-add:hover {
  background-color: #7FB8A4;
  color: #FFF;
}

.btn-remove-field {
  color: #2c3e50;
}
.btn-remove-field:focus, .btn-remove-field:hover {
  color: red;
}

.btn-submit {
  border: 3px dotted #CBDBEA;
  padding: 10px 16px;
  margin: 10px 0px;
}
.btn-submit:focus, .btn-submit:hover {
  background-color: #CBDBEA;
}

.icon {
  padding: 10px 16px;
}

.row {
  display: flex;
  padding: 10px 0px;
}
.col {
  width: 100%;
}

.d-flex {
  display: flex;
}
.d-flex-1 {
  flex: 1;
}
.d-flex-0 {
  flex: 0;
}

.py-10 {
  padding-top: 10px;
  padding-bottom: 10px;
}
.px-20 {
  padding-left: 20px;
  padding-right: 20px;
}

.center {
  justify-content: center;
  align-items: center;
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
