<template>
  <div id="home" class="page">
    <Header />
    <FormListLink />
    <FormTitleHeader />

    <Row class="py-0">
      <div class="col d-flex justify-content-flex-end">
        <nav>
          <router-link :to="linkToForm" tabindex="0">See form</router-link>
        </nav>
      </div>
    </Row>

    <section class="submissions-section">
      <div v-if="isLoading">
        Loading...
      </div>

      <div v-if="error" class="alert-error">
        {{error}}
      </div>

      <div class="display">
        <div v-if="submissions.length > 0">
          <table>
            <tr>
              <th v-for="(heading, index) in headings" v-bind:key="index">{{heading}}</th>
            </tr>
            <tr v-for="(row, index) in rows" v-bind:key="index">
              <td v-for="(field, index) in row" v-bind:key="index">{{field}}</td>
            </tr>
          </table>
        </div>

        <div v-else>
          <Heading type="h3" text="No submissions yet" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Heading from '../components/Heading.vue';
import Header from '../components/Header.vue';
import FormListLink from '../components/FormListLink.vue';
import FormTitleHeader from '../components/FormTitleHeader.vue';
import config from '../config';
import axios from 'axios';

const env = process.env.NODE_ENV;
const backendUrl = config[env].backendUrl;

export default {
  name: "FormView",
  components: {
    Heading,
    Header,
    FormListLink,
    FormTitleHeader,
  },
  data: function() {
    return {
      isLoading: false,
      form: {},
      submissions: [],
      answers_json: [],
      alert: null,
      error: null
    }
  },
  computed: {
    linkToForm: function() {
      return "/forms/" + this.$route.params.id
    },
    headings: function() {
      if (this.form) {
        const fields = JSON.parse(this.form.fields_json);
        return fields.map(field => field.label);
      } else {
        return [];
      }
    },
    rows: function() {
      if (this.submissions.length > 0) {
        return this.submissions.map(s => JSON.parse(s.answers_json));
      } else {
        return [];
      }
    }
  },
  methods: {
    fetchSubmissions: function() {
      this.error = null;
      this.isLoading = true;

      axios.get(backendUrl + "/forms/" + this.$route.params.id + "/submissions")
      .then(res => {
        this.isLoading = false;
        this.submissions = res.data.submissions;
        this.form = res.data.form;
      }).catch(err => {
        this.isLoading = false;
        this.error = err;
      })
    }
  },
  created() {
    this.fetchSubmissions();
  }
}
</script>

<style scoped>
.submissions-section {
  padding: 15px;
}
</style>
