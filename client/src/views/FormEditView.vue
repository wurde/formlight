<template>
  <div id="home" class="page">
    <Header />
    <FormListLink />

    <div v-if="error" class="text-error">
      {{error}}
    </div>

    <FormTitleHeader />

    <div class="row py-0">
      <div class="col-50">
        <FormModeLink />
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

        <form @submit.prevent="createOrUpdateForm">
          <label>Fields</label>

          <div v-for="(field, index) in form.fields_json" v-bind:key="fieldName(field.label)" class="form-group">
            <div class="row">
              <div class="col d-flex-1">
                <input v-bind:ref="'update-field-' + index"
                      v-bind:id="'update-field-' + index"
                      v-bind:type="field.type"
                      v-bind:name="fieldName(field.label)"
                      v-model="form.fields_json[index].label"
                      v-bind:class="{ 'input-danger': hasError }"
                      v-focus />
              </div>
              <div class="col d-flex-0 d-flex center">
                <button type="button" v-on:click.prevent="removeField(index, $event)" class="btn-remove-field text-danger py-10 px-20" tabindex="0">
                  <i class="fa fa-minus-circle"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="row">
            <button type="button" v-on:click.prevent="addField" class="btn-add" tabindex="0">
              <i class="fa fa-plus icon"></i>
            </button>
          </div>

          <button type="submit" class="btn-submit" tabindex="0">
            Save changes
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
import FormModeLink from '../components/FormModeLink.vue';
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
    FormModeLink,
  },
  data: function() {
    return {
      isLoading: false,
      form: {},
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
      axios.get(backendUrl + `/forms/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
      }).catch(err => {
        this.error = err.response.data.message;
      })
    },
    createOrUpdateForm: function() {
      alert(JSON.stringify(this.form))
      // // Check if form exists
      // axios.get(backendURL + '/forms/1')
      // .then(() => {
      //   // Update form
      //   axios.patch(backendURL + '/forms/1', this.form)
      //   .then(() => {
      //     this.error = this.alert = null
      //     this.alert = 'Successfully saved changes.'
      //   })
      //   .catch(err => {
      //     this.alert = null
      //     this.error = `Error: ${err.response.data.message}`;
      //   })

      // }).catch(() => {
      //   // Create new form
      //   axios.post(backendURL + '/forms', this.form)
      //   .then(() => {
      //     this.error = this.alert = null
      //     this.alert = 'Successfully saved changes.'
      //   })
      //   .catch(err => {
      //     this.alert = null
      //     this.error = `Error: ${err.response.data.message}`;
      //   })
      // })
    },
    addField: function() {
      this.form.fields_json = this.form.fields_json || [];
      this.alert = '';

      const length = this.form.fields_json.length
      const lastField = this.form.fields_json[length - 1]
      if (lastField && lastField.label.length == 0) {
        document.getElementById('update-field-' + (length - 1)).focus();
        return
      }

      this.form.fields_json.push({ 'type': 'text', 'label': '' })
    },
    removeField: function(index) {
      this.alert = '';
      this.form.fields_json.splice(index, 1)
    },
    fieldName: function(label) {
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
