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
  padding: 10px 16px;
}

a:hover {
  text-shadow: 0 5px 30px #EEC480;
}
</style>
