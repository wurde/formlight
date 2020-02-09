<template>
  <section class="form-section">
    <div v-if="isLoading">
      Loading...
    </div>

    {{ $route.params.id }}

    <div v-if="!isLoading" v-show="isEditing" class="editable">
      <h3>Form</h3>

      <div v-show="error" class="errors">{{error}}</div>
      <div v-show="alert" class="alert">{{alert}}</div>

      <form @submit.prevent="createOrUpdateForm">
        <div class="form-group">
          <label for="form-title" v-bind:class="{ 'text-danger':  hasError}">Title</label>
          <input id="form-title" type="text" name="title" v-bind:class="{ 'input-danger': hasError }" v-model="form.title" autofocus />
        </div>

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

    <div v-if="!isLoading" v-show="!isEditing" class="display">
      <h3>{{form.title}}</h3>

      <div v-show="error" class="errors">{{error}}</div>
      <div v-show="alert" class="alert">{{alert}}</div>

      <form @submit.prevent="submitForm">
        <div v-for="(field, index) in form.fields_json" v-bind:key="fieldName(field.label)" class="form-group">
          <label v-bind:for="'submit-field-' + index"
                 v-bind:class="{ 'text-danger':  hasError}">{{ field.label }}</label>
          <input v-bind:id="'submit-field-' + index"
                 v-bind:type="field.type" v-bind:name="fieldName(field.label)"
                 v-model="form.answers[index]"
                 v-bind:class="{ 'input-danger': hasError }" />
        </div>

        <button type="submit" class="btn-submit" tabindex="0">
          Submit
        </button>
      </form>
    </div>

    <nav>
      <a v-on:click.prevent="$emit('toggleCurrentView')" class="a-see-submissions" tabindex="0">See submissions</a>
    </nav>
  </section>
</template>

<script>
import axios from 'axios';
import config from '../config';

const env = process.env.NODE_ENV;
const backendURL = config[env].backendUrl;

export default {
  name: 'Form',
  props: ['isEditing'],
  data: function() {
    return {
      isLoading: false,
      form: {},
      error: null,
      alert: null
    }
  },
  created: function() {
    this.fetchForm();
  },
  computed: {
    hasError: function() {
      return this.error !== null ? true : false;
    }
  },
  methods: {
    fetchForm: function() {
      this.form = this.error = this.alert = null;
      this.isLoading = true;

      axios.get(backendURL + '/forms/1')
      .then(res => {
        this.isLoading = false;
        this.form = {
          title: res.data.title,
          fields_json: JSON.parse(res.data.fields_json) || [],
          answers: []
        }
      }).catch(() => {
        this.isLoading = false;
        this.form = {
          title: '',
          fields_json: [],
          answers: []
        };
      })
    },
    createOrUpdateForm: function() {
      // Check if form exists
      axios.get(backendURL + '/forms/1')
      .then(() => {
        // Update form
        axios.patch(backendURL + '/forms/1', this.form)
        .then(() => {
          this.error = this.alert = null
          this.alert = 'Successfully saved changes.'
        })
        .catch(err => {
          this.alert = null
          this.error = `Error: ${err.response.data.message}`;
        })

      }).catch(() => {
        // Create new form
        axios.post(backendURL + '/forms', this.form)
        .then(() => {
          this.error = this.alert = null
          this.alert = 'Successfully saved changes.'
        })
        .catch(err => {
          this.alert = null
          this.error = `Error: ${err.response.data.message}`;
        })
      })
    },
    submitForm: function() {
      axios.post(backendURL + '/forms/1/submissions', this.form)
      .then(() => {
        this.error = null
        this.alert = 'Successfully sent answers!'
      })
      .catch(err => {
        this.alert = null
        this.error = `Error: ${err.response.data.message}`;
      })
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
  directives: {
    focus: {
      inserted: function(element) {
        element.focus();
      }
    }
  }
}
</script>

<style scoped>
</style>
