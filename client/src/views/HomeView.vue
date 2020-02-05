<template>
  <div id="home">
    <h3>Welcome {{formUser}}! <small>(<a @click="signout" href="#">Sign out</a>)</small></h3>
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
      isEditing: true,
      formUser: localStorage.getItem('formUser')
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
      this.isEditing = !this.isEditing
    },
    signout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  },
}
</script>
