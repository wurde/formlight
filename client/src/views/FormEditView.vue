<template>
  <div id="home" class="page">
    <Header />
    <FormListLink />

    <div v-if="error" class="text-error">
      {{error}}
    </div>

    <FormTitleHeader />

    <div class="text-align-right float-right" v-on:toggleIsEditing="toggleIsEditing" v-bind:isEditing="isEditing">
      <i v-show="isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-file-alt icon" tabindex="0"></i>
      <i v-show="!isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-edit icon" tabindex="0"></i>
    </div>
    <Main v-bind:isEditing="isEditing" />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import FormListLink from '../components/FormListLink.vue';
import FormTitleHeader from '../components/FormTitleHeader.vue';
import Main from '../components/Main.vue';
import config from '../config';
import axios from 'axios';

const env = process.env.NODE_ENV;
const backendUrl = config[env].backendUrl;

export default {
  name: "FormView",
  components: {
    Header,
    FormListLink,
    FormTitleHeader,
    Main
  },
  data: function() {
    return {
      username: localStorage.getItem('username'),
      formTitle: localStorage.getItem('formTitle'),
      isEditing: localStorage.getItem("isEditing") == "true" || false,
      error: null
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
    fetchForm() {
      axios.get(backendUrl + `/forms/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
      }).catch(err => {
        alert(err);
      })
    },
    removeForm() {
      const yes = confirm("Are you sure? This action is permanent.")

      if (yes) {
        axios.delete(backendUrl + `/forms/${this.$route.params.id}`)
        .then(() => {
          this.$router.push('/forms');
        }).catch(err => {
          this.error = err.response.data.message;
        })
      }
    }
  },
  created() {
    localStorage.setItem("isEditing", this.isEditing);
    this.fetchForm();
  }
}
</script>

<style scoped>
</style>
