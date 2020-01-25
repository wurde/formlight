<template>
  <section class="form-section">
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-if="!isLoading" v-show="isEditing" class="editable">
      <h3>Form</h3>

      {{form}}

      <div v-show="error" class="errors">{{error}}</div>
      <div v-show="alert" class="alert">{{alert}}</div>

      <form @submit.prevent="submitUpdateForm">
        <div class="form-group">
          <label for="form-title" v-bind:class="{ 'text-danger':  hasError}">Title</label>
          <input id="form-title" type="text" name="title" v-bind:class="{ 'input-danger': hasError }" v-model="form.title" autofocus />
        </div>

        <h4>Fields</h4>

        <div v-for="(field, index) in form.fields_json" v-bind:key="fieldName(field.label)" class="form-group">
          <input v-bind:id="'field-' + index"
                 v-bind:type="field.type"
                 v-bind:name="fieldName(field.label)"
                 v-bind:value="field.label"
                 v-bind:class="{ 'input-danger': hasError }"
                 v-focus />
        </div>

        <div class="row">
          <button type="button" v-on:click.prevent="addField" class="btn-add-field">
            <i class="fa fa-plus icon"></i>
          </button>
        </div>

        <button type="submit" class="btn-submit">
          Save changes
        </button>
      </form>
    </div>

    <div v-if="!isLoading" v-show="!isEditing" class="display">
      <h3>{{form.title}}</h3>

      <div v-show="error" class="errors">{{error}}</div>
      <div v-show="alert" class="alert">{{alert}}</div>

      <!--
      <form @submit.prevent="submitForm">
        <div v-for="(field, index) in from.fields_json" v-bind:key="fieldName(field.label)" class="form-group">
          <label v-bind:for="'field-' + index" v-bind:class="{ 'text-danger':  hasError}">{{ field.label }}</label>
          <input v-bind:id="'field-' + index" v-bind:type="field.type" v-bind:name="fieldName(field.label)" v-bind:class="{ 'input-danger': hasError }" />
        </div>

        <button type="submit" class="btn-submit">
          Submit
        </button>
      </form>
      -->
    </div>

    <nav>
      <a v-on:click.prevent="$emit('toggleCurrentView')" class="a-see-submissions">See submissions</a>
    </nav>
  </section>
</template>

<script>
import axios from 'axios';

const backendURL = 'http://localhost:3000';

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
    this.fetchFormData();
  },
  computed: {
    hasError: function() {
      return this.error !== null ? true : false;
    },
    fieldID: function() {
      return `field-${ this.index }`
    }
  },
  methods: {
    fetchFormData: function() {
      this.form = this.error = this.alert = null;
      this.isLoading = true;

      this.alert = 'Successfully fetched data.';
      this.form = { title: 'Applicant Survey', fields_json: [{ type: 'text', label: 'What is your favorite color?' }] }
      this.isLoading = false;
      // axios.get(backendURL + '/forms/1')
      // .then(res => {
      //   this.isLoading = false;
      //   this.alert = 'Successfully fetched data.';
      //   this.form = res.data
      // }).catch(() => {
      //   this.isLoading = false;
      //   this.error = 'Failed to fetch form data.';
      // })
    },
    submitUpdateForm: function() {
      axios.patch(backendURL + '/forms/1', this.form)
      .then(() => {
        this.error = this.alert = null
        this.alert = 'Successfully saved changes.'
      })
      .catch(err => {
        this.alert = null
        this.error = `Error: ${err.response.data.message}`;
      })
    },
    submitForm: function() {
      alert('Submit Form')
      // axios.post(backendURL + '/forms/1/submissions', {
      //   form_title: this.form.title,
      //   fields_json: this.from.fields_json,
      //   answers_json: this.answers_json,
      // })
      // .then(() => {
      //   this.error = null
      //   this.alert = 'Successfully saved changes.'
      // })
      // .catch(err => {
      //   const res = err.response;
      //   this.alert = null
      //   this.error = `Error: ${res.data.message}`;
      // })
    },
    addField: function() {
      this.form.fields_json.push({ 'type': 'text', 'label': '' })
      // Focus last field
    },
    fieldName: function(label) {
      return label.replace(' ', '-').toLowerCase()
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
.form-section {
  padding: 15px;
}

input {
  width: 100%;
  height: 2em;
  padding: 15px;
  margin: 10px 0px;
  border-radius: 5px;
  border: 1px solid #CBDBEA;
  font-size: 18px;
  outline: none;
}

input:focus {
  box-shadow: 0 3px 15px #CBDBEA;
}

label {
  font-weight: bold;
}

nav {
  margin: 20px 0px;
}

a {
  text-decoration: underline;
  cursor: pointer;
  padding: 10px 16px;
  padding-left: 0px;
}

a:hover {
  text-shadow: 0 5px 30px #EEC480;
}

.errors {
  color: red;
  font-weight: bold;
  padding-bottom: 10px;
}

.alert {
  color: #007149;
  font-weight: bold;
  padding-bottom: 10px;
}

.text-danger {
  color: red;
}
.input-danger {
  border: 1px solid red;
}
.input-danger:focus {
  box-shadow: 0 1px 5px red;
}

button {
  background-color: #FFF;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  font-size: 18px;
  border: none;
}

.btn-add-field {
  border: 1px solid #7FB8A4;
  color: #7FB8A4;
}
.btn-add-field:hover {
  background-color: #7FB8A4;
  color: #FFF;
}

.btn-submit {
  border: 3px dotted #CBDBEA;
  padding: 10px 16px;
  margin: 10px 0px;
}
.btn-submit:hover {
  background-color: #CBDBEA;
}

.icon {
  padding: 10px 16px;
}

.row {
  display: flex;
  padding: 10px 0px;
}
</style>
