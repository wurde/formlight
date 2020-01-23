<template>
  <div id="app">
    <Header v-bind:isEditing="isEditing" v-on:toggleIsEditing="toggleIsEditing" />
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Header
  },
  data: function() {
    return {
      isEditing: true
    }
  },
  methods: {
    toggleIsEditing: function() {
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
