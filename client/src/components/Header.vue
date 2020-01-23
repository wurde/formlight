<template>
  <div>
    <i v-if="currentView == 'editing'" v-on:click="toggleView" class="fas fa-edit icon"></i>
    <i v-if="currentView == 'submission'" v-on:click="toggleView" class="fas fa-file-alt icon"></i>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function() {
    return {
      currentView: 'editing'
    }
  },
  methods: {
    toggleView: function() {
      this.currentView = this.currentView == 'editing' ? 'submission' : 'editing'
    }
  }
}
</script>

<style scoped>
.icon {
  font-size: 32px;
}
</style>
