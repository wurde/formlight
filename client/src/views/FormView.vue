<template>
  <div id="home" class="page">
    <Header />
    <FormListLink />
    <FormTitleHeader />

    <div class="row py-0">
      <div class="col-50">
        <EditModeLink />
      </div>

      <div class="col-50 d-flex justify-content-flex-end">
        <nav>
          <router-link :to="linkToSubmissions" tabindex="0">See submissions</router-link>
        </nav>
      </div>
    </div>

    <section class="form-section">
      <div v-if="isLoading">
        Loading...
      </div>

      <div v-if="!isLoading">
        <div v-show="error" class="errors">{{error}}</div>
        <div v-show="alert" class="alert">{{alert}}</div>

        <form @submit.prevent="submitForm">
          <div v-for="(field, index) in form.fields_json" v-bind:key="fieldName(field.label)" class="form-group">
            <label v-bind:for="'submit-field-' + index"
                  v-bind:class="{ 'text-danger':  hasError}">{{ field.label }}</label>
            <input v-bind:id="'submit-field-' + index"
                  v-bind:type="field.type" v-bind:name="fieldName(field.label)"
                  v-model="answers_json[index]"
                  v-bind:class="{ 'input-danger': hasError }" />
          </div>

          <button type="submit" class="btn-submit" tabindex="0">
            Submit
          </button>
        </form>

      </div>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import FormListLink from '../components/FormListLink.vue';
import FormTitleHeader from '../components/FormTitleHeader.vue';
import EditModeLink from '../components/EditModeLink.vue';
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
    EditModeLink,
  },
  data: function() {
    return {
      isLoading: false,
      form: {},
      answers_json: [],
      alert: null,
      error: null
    }
  },
  computed: {
    hasError: function() {
      return this.error !== null ? true : false;
    },
    linkToSubmissions: function() {
      return "/forms/" + this.$route.params.id + "/submissions"
    }
  },
  methods: {
    fetchForm() {
      this.form = this.error = this.alert = null;
      this.isLoading = true;

      axios.get(backendUrl + `/forms/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
        this.form.fields_json = JSON.parse(this.form.fields_json);
        this.isLoading = false;
      }).catch(err => {
        this.error = err.response.data.message;
        this.isLoading = false;
      })
    },
    submitForm: function() {
      axios.post(backendUrl + `/forms/${this.$route.params.id}/submissions`, {
        form_title: this.form.title,
        answers_json: this.answers_json
      })
      .then(() => {
        this.error = null
        this.alert = 'Successfully sent answers!'
      })
      .catch(err => {
        this.alert = null
        this.error = `Error: ${err.response.data.message}`;
      })
    },
    fieldName: function(label) {
      if (!label) return '';
      return label.replace(/ /g, '-').toLowerCase()
    }
  },
  created() {
    this.fetchForm();
  },
  directives: {
    focus: {
      inserted: function(element) {
        element.focus();
      }
    }
  }
}
</script>
