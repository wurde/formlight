<template>
  <section class="form-section">
    <div v-show="isEditing" class="editable">
      <input type="text" name="title" v-model="title" autofocus />
    </div>

    <div v-show="!isEditing" class="display">
      <h3>{{title}}</h3>
    </div>

    <a v-on:click.prevent="$emit('toggleCurrentView')" class="a-see-submissions">See submissions</a>
  </section>
</template>

<script>
export default {
  name: 'Form',
  props: ['isEditing'],
  data: function() {
    return {
      title: 'ExampleForm'
    }
  },
  methods: {
    toggleCurrentView: function() {
      alert('toggle')
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
  outline: none;
}

a {
  text-decoration: underline;
  cursor: pointer;
  padding: 10px 16px;
}

a:hover {
  text-shadow: 0 5px 30px #EEC480;
}
</style>
