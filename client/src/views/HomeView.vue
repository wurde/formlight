<template>
  <div id="home">
    <Header v-bind:isEditing="isEditing" v-on:toggleIsEditing="toggleIsEditing" />
    <Main v-bind:isEditing="isEditing" />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Main from '../components/Main.vue';

export default {
  name: "HomeView",
  // Tip: avoid mistake of passing an array to "components".
  components: {
    Header,
    Main
  },
  data: function() {
    return {
      isEditing: localStorage.getItem("isEditing") == "true" || false
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    toggleIsEditing() {
      localStorage.setItem("isEditing", !this.isEditing)
      this.isEditing = !this.isEditing
    },
  },
  created() {
    localStorage.setItem("isEditing", this.isEditing)
  }
}
</script>

<style scoped>
</style>
