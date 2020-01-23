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
</style>
