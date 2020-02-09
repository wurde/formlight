<template>
  <div id="form-list" class="page" :key="componentKey">
    <Header />
    <Heading type="h1" text="Forms" />

    <Row>
      <ul class="list-style-none">
        <li v-for="form in forms" :key="form.id">
          <Row>
            <a href="#" @click="() => clickFormLink(form)">{{form.title}}</a>
          </Row>
        </li>
      </ul>
    </Row>

    <Row>
      <form @submit.prevent="createForm" method="post">
        <div v-if="error" class="text-error">
          {{error}}
        </div>

        <input type="text" name="title" placeholder="Add a new form" v-model="title" />
        <button type="submit" class="btn-add" tabindex="0">
          <i class="fa fa-plus icon"></i>
        </button>
      </form>
    </Row>
  </div>
</template>

<script>
import Heading from "../components/Heading.vue";
import Header from "../components/Header.vue";
import Row from "../components/Row.vue";
import axios from "axios";
import config from "../config";

const env = process.env.NODE_ENV;
const backendUrl = config[env].backendUrl;

export default {
  name: "FormListView",
  components: {
    Heading,
    Header,
    Row,
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
        this.title = '';
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
