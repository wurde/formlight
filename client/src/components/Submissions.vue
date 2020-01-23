<template>
  <div>
    <h3>Submissions</h3>
    <a v-on:click.prevent="$emit('toggleCurrentView')">See form</a>
  </div>
</template>

<script>
export default {
  name: 'Submissions',
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
