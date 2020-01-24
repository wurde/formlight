<template>
  <main>
    <Form v-show="currentView == 'form'" v-on:toggleCurrentView="toggleCurrentView" v-bind:isEditing="isEditing" />
    <Submissions v-show="currentView == 'submissions'" v-on:toggleCurrentView="toggleCurrentView" v-bind:isEditing="isEditing" />
  </main>
</template>

<script>
import Form from './Form.vue';
import Submissions from './Submissions.vue';

export default {
  name: 'Main',
  props: ['isEditing'],
  components: {
    Form,
    Submissions,
  },
  data: function() {
    return {
      currentView: 'form'
    }
  },
  methods: {
    toggleCurrentView: function() {
      this.currentView = this.currentView == 'form' ? 'submissions' : 'form';
    }
  }
}
</script>

<style scoped>
</style>
