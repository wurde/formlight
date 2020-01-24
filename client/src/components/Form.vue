<template>
  <section class="form-section">
    <div v-show="isEditing" class="editable">
      <h3>Form</h3>

      <div v-show="error" class="errors">{{error}}</div>
      <div v-show="alert" class="alert">{{alert}}</div>

      <form @submit.prevent="submit">
        <label for="form-title" v-bind:class="{ 'text-danger':  hasError}">Title</label>
        <input id="form-title" type="text" name="title" v-bind:class="{ 'input-danger': hasError }" v-model="title" autofocus />

        <button type="submit" class="btn-submit">
          Save changes
        </button>
      </form>
    </div>

    <div v-show="!isEditing" class="display">
      <h3>{{title}}</h3>
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
      title: 'ExampleForm',
      error: null,
      alert: null
    }
  },
  computed: {
    hasError: function() {
      return this.error !== null ? true : false;
    }
  },
  methods: {
    submit: function() {
      axios.post(backendURL + '/forms', { title: this.title })
      .then(() => {
        this.error = null
        this.alert = 'Successfully saved changes.'
      })
      .catch(err => {
        const res = err.response;
        this.alert = null
        this.error = `Error: ${res.data.message}`;
      })
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

.btn-submit {
  background-color: #FFF;
  border: 3px dotted #CBDBEA;
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  outline: none;
}
.btn-submit:hover {
  background-color: #CBDBEA;
}

</style>
