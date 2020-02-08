<template>
  <div id="home" class="page">
    <Header v-bind:isEditing="isEditing" v-on:toggleIsEditing="toggleIsEditing" />
    <FormListLink />
    <Main v-bind:isEditing="isEditing" />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import FormListLink from '../components/FormListLink.vue';
import Main from '../components/Main.vue';

export default {
  name: "FormView",
  // Tip: avoid mistake of passing an array to "components".
  components: {
    Header,
    FormListLink,
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
