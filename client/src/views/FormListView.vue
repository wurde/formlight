<template>
  <div id="form-list" class="page" :key="componentKey">
    <Header />

    <h1>Forms</h1>

    <div class="row">
      <ul class="list-style-none">
        <li v-for="form in forms" :key="form.id">
          <div class="row">
            <a href="#" @click="() => clickFormLink(form)">{{form.title}}</a>
          </div>
        </li>
      </ul>
    </div>

    <div class="row">
      <form @submit.prevent="createForm" method="post">
        <div v-if="error" class="text-error">
          {{error}}
        </div>

        <input type="text" name="title" placeholder="Add a new form" v-model="title" />
        <button type="submit" class="btn-add" tabindex="0">
          <i class="fa fa-plus icon"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import axios from "axios";
import config from "../config";

const env = process.env.NODE_ENV;
const backendUrl = config[env].backendUrl;

export default {
  name: "FormListView",
  components: {
    Header
  },
  data: function() {
    return {
      componentKey: 0,
      username: localStorage.getItem('username'),
      forms: [],
      title: null,
      error: null
    }
  },
  methods: {
    fetchForms() {
      this.error = null;

      axios.get(backendUrl + "/forms", {
        params: { username: this.username }
      })
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
      }).then(() => {
        this.fetchForms();
      }).catch(err => {
        this.error = err.response.data.message;
      })
    },
    clickFormLink(form) {
      localStorage.setItem('formTitle', form.title)

      if (form.fields_json && form.fields_json.length > 0) {
        this.$router.push("/forms/" + form.id);
      } else {
        this.$router.push("/forms/" + form.id + "/edit");
      }
    }
  },
  created() {
    this.fetchForms();
  }
}
</script>
