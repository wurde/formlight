<template>
  <section class="submissions-section">
    <div v-show="isEditing" class="editable">
      <h3>Submissions</h3>
    </div>

    <div v-show="!isEditing" class="display">
      <h3>Submissions</h3>
    </div>

    <nav>
      <a v-on:click.prevent="$emit('toggleCurrentView')" class="a-see-form">See form</a>
    </nav>
  </section>
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
.submissions-section {
  padding: 15px;
  border: 1px solid blue;
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
</style>
