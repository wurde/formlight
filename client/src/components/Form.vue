<template>
  <section class="form-section">
    <div v-show="isEditing" class="editable">
      <h3>Form</h3>

      <div v-show="error" class="errors">{{error}}</div>
      <div v-show="alert" class="alert">{{alert}}</div>

      <form @submit.prevent="submitUpdateForm">
        <div class="form-group">
          <label for="form-title" v-bind:class="{ 'text-danger':  hasError}">Title</label>
          <input id="form-title" type="text" name="title" v-bind:class="{ 'input-danger': hasError }" v-model="title" autofocus />
        </div>

        <h4>Fields</h4>

        <div v-for="(field, index) in fields" v-bind:key="fieldName(field.label)" class="form-group">
          <input v-bind:id="'field-' + index" v-bind:type="field.type" v-bind:name="fieldName(field.label)" v-bind:value="field.label" v-bind:class="{ 'input-danger': hasError }" />
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

    <div v-show="!isEditing" class="display">
      <h3>{{title}}</h3>

      <div v-show="error" class="errors">{{error}}</div>
      <div v-show="alert" class="alert">{{alert}}</div>

      <form @submit.prevent="submitForm">
        <div v-for="(field, index) in fields" v-bind:key="fieldName(field.label)" class="form-group">
          <label v-bind:for="'field-' + index" v-bind:class="{ 'text-danger':  hasError}">{{ field.label }}</label>
          <input v-bind:id="'field-' + index" v-bind:type="field.type" v-bind:name="fieldName(field.label)" v-bind:class="{ 'input-danger': hasError }" />
        </div>

        <button type="submit" class="btn-submit">
          Submit
        </button>
      </form>
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
      title: 'Applicant Survey',
      fields: [{ 'type': 'text', 'label': 'Name' }],
      error: null,
      alert: null
    }
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
    submitUpdateForm: function() {
      axios.post(backendURL + '/forms', {
        title: this.title,
        fields_json: this.fields_json,
      })
      .then(() => {
        this.error = null
        this.alert = 'Successfully saved changes.'
      })
      .catch(err => {
        const res = err.response;
        this.alert = null
        this.error = `Error: ${res.data.message}`;
      })
    },
    submitForm: function() {
      axios.post(backendURL + '/forms/1/submissions', {
        form_title: this.form_title,
        fields_json: this.fields_json,
        answers_json: this.answers_json,
      })
      .then(() => {
        this.error = null
        this.alert = 'Successfully saved changes.'
      })
      .catch(err => {
        const res = err.response;
        this.alert = null
        this.error = `Error: ${res.data.message}`;
      })
    },
    addField: function() {
      this.fields = this.fields.push({
        'type': 'text', 'label': 'Hello'
      })
    },
    fieldName: function(label) {
      return label.replace(' ', '-').toLowerCase()
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
