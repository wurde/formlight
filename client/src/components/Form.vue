<template>
  <section class="form-section">
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-if="!isLoading" v-show="isEditing" class="editable">
      <h3>Form</h3>

      <div v-show="error" class="errors">{{error}}</div>
      <div v-show="alert" class="alert">{{alert}}</div>

      <form @submit.prevent="updateForm">
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
                    v-bind:value="field.label"
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
          <button type="button" v-on:click.prevent="addField" class="btn-add-field" tabindex="0">
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
          <label v-bind:for="'submit-field-' + index" v-bind:class="{ 'text-danger':  hasError}">{{ field.label }}</label>
          <input v-bind:id="'submit-field-' + index" v-bind:type="field.type" v-bind:name="fieldName(field.label)" v-bind:class="{ 'input-danger': hasError }" />
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
        this.alert = 'Successfully fetched form data.';
        this.form = {
          title: res.data.title,
          fields_json: JSON.parse(res.data.fields_json)
        }
      }).catch(() => {
        this.isLoading = false;
        this.error = 'Failed to fetch form data.';
      })
    },
    updateForm: function() {
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
      alert('Submit', JSON.stringify(this.form, null, 2));

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
      this.form.fields_json = this.form.fields_json || [];

      const length = this.form.fields_json.length
      const lastField = this.form.fields_json[length - 1]
      if (lastField && lastField.label.length == 0) {
        document.getElementById('update-field-' + (length - 1)).focus();
        return
      }

      this.form.fields_json.push({ 'type': 'text', 'label': '' })
    },
    removeField: function(index) {
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
  outline: none;
}

a:focus, a:hover {
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
.btn-add-field:focus, .btn-add-field:hover {
  background-color: #7FB8A4;
  color: #FFF;
}

.btn-remove-field {
  color: #2c3e50;
}
.btn-remove-field:focus, .btn-remove-field:hover {
  color: red;
}

.btn-submit {
  border: 3px dotted #CBDBEA;
  padding: 10px 16px;
  margin: 10px 0px;
}
.btn-submit:focus, .btn-submit:hover {
  background-color: #CBDBEA;
}

.icon {
  padding: 10px 16px;
}

.row {
  display: flex;
  padding: 10px 0px;
}
.col {
  width: 100%;
}

.d-flex {
  display: flex;
}
.d-flex-1 {
  flex: 1;
}
.d-flex-0 {
  flex: 0;
}

.py-10 {
  padding-top: 10px;
  padding-bottom: 10px;
}
.px-20 {
  padding-left: 20px;
  padding-right: 20px;
}

.center {
  justify-content: center;
  align-items: center;
}
</style>
