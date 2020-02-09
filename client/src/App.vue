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

a {
  text-decoration: underline;
  color: inherit;
  cursor: pointer;
  padding-left: 0px;
  outline: none;
}
a:focus, a:hover {
  text-shadow: 0 5px 30px #EEC480;
}

table {
  border: 1px solid #2c3e50;
  width: 100%;
  border-radius: 5px;
}
table tr:nth-child(even) {
  background-color: #CBDBEA;
}
table tr:nth-child(odd) {
  background-color: #fff;
}
table th {
  color: white;
  background-color: #2c3e50;
}
table td,th {
  padding: 5px;
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
.alert-error {
  color: red;
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
  font-size: 18px;
  padding: 10px 16px;
  cursor: pointer;
  outline: none;
}

.icon:focus, .icon:hover {
  text-shadow: 0 5px 30px #EEC480;
}

.col {
  width: 100%;
}
.col-90 {
  width: 90%;
}
.col-50 {
  width: 50%;
}
.col-10 {
  width: 10%;
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

.py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}
.py-10 {
  padding-top: 10px;
  padding-bottom: 10px;
}
.py-5 {
  padding-top: 5px;
  padding-bottom: 5px;
}
.px-20 {
  padding-left: 20px;
  padding-right: 20px;
}

.center {
  justify-content: center;
  align-items: center;
}

.list-style-none {
  list-style: none;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.justify-content-center {
  justify-content: center;
}
.justify-content-flex-end {
  justify-content: flex-end;
}
.align-self-flex-end {
  align-self: flex-end;
}
.text-align-center {
  text-align: center;
}
.input-group {
  display: block;
  width: 100%;
  magrin-bottom: 1.2rem;
}

@media (min-width: 576px) {
  main { width: 90%; }
}

@media (min-width: 768px) {
  main { width: 80%; }
}

@media (min-width: 992px) {
  main { width: 60%; }
}

@media (min-width: 1200px) {
  main { width: 40%; }
}
</style>

<style scoped>
.router-anim-enter {
  transform: translateY(50px);
  opacity: 0;
}
.router-anim-leave {
  transform: translateY(-50px);
  opacity: 0;
}
.router-anim-enter-active {
  transition: all .3s ease;
}
.router-anim-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>
