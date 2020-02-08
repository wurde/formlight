<template>
  <div id="form-list" class="page">
    <h1>Forms</h1>

    <div class="row">
      <ul class="list-style-none">
        <li class="py-5">
          <router-link to="/forms/1">Survey 1</router-link>
        </li>
        <li class="py-5">
          <router-link to="/forms/2">Survey 2</router-link>
        </li>
        <li class="py-5">
          <router-link to="/forms/3">Survey 3</router-link>
        </li>
      </ul>
    </div>

    <div class="row">
      <form @submit.prevent="createForm" method="post">
        <div v-if="error" class="text-error">
          {{error}}
        </div>

        <input type="text" name="title" placeholder="Survey" v-model="form.title" />
        <button type="submit" class="btn-add" tabindex="0">
          <i class="fa fa-plus icon"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";

const env = process.env.NODE_ENV;
const backendUrl = config[env].backendUrl;

export default {
  name: "FormListView",
  data: function() {
    return {
      username: localStorage.getItem('username'),
      forms: [],
      form: {},
      error: null
    }
  },
  methods: {
    fetchForms() {
      this.error = null;

      axios.get(backendUrl + "/forms")
      .then(res => {
        this.forms = res.data;
      }).catch(err => {
        this.error = err;
      })
    },
    createForm() {
      this.error = null;

      axios.post(backendUrl + "/forms", {
        username: this.username,
        title: this.form.title
      }).then(res => {
        alert(res);
      }).catch(err => {
        this.error = err.response.data.message;
      })
    },
  },
  created() {
    this.fetchForms();
  }
}
</script>

<style scoped>
</style>
