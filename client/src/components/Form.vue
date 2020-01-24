<template>
  <section class="form-section">
    <div v-show="isEditing" class="editable">
      <h3>Form</h3>

      <div v-show="error" class="errors">{{error}}</div>

      <form @submit.prevent="submit">
        <label for="form-title">Title</label>
        <input id="form-title" type="text" name="title" v-model="title" autofocus />

        <button type="submit">
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
      error: null
    }
  },
  methods: {
    toggleCurrentView: function() {
      alert('toggle')
    },
    submit: function() {
      axios.post(backendURL + '/forms')
      .then(res => alert(JSON.stringify(res)))
      .catch(err => {
        const res = err.response;
        this.error = `Error: ${res.data.error.message}`;
      })
    }
  }
}
</script>

<style scoped>
.form-section {
  padding: 15px;
  border: 1px solid blue;
}

input {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #CCC;
  margin-top: 8px;
  outline: none;
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
</style>
