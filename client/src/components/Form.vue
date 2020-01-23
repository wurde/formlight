<template>
  <div>
    <h3>Form</h3>
    <a v-on:click.prevent="$emit('toggleCurrentView')">See submissions</a>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: ['isEditing'],
  methods: {
    toggleCurrentView: function() {
      alert('toggle')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  text-shadow: 0 5px 30px #EEC480;
}
</style>
