<template>
  <div id="form-list" class="page">
    <h1>Forms</h1>

    <div class="row">
      <ul class="list-style-none">
        <li v-for="form in forms" :key="form.id" class="py-5">
          <router-link :to="'/forms/' + form.id">{{form.title}}</router-link>
        </li>
      </ul>
    </div>

    <div class="row">
      <form @submit.prevent="createForm" method="post">
        <div v-if="error" class="text-error">
          {{error}}
        </div>

        <input type="text" name="title" placeholder="Survey" v-model="title" />
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
      title: null,
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
        title: this.title
      }).then(res => {
        this.$router.push("/forms/" + res.data.id);
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
