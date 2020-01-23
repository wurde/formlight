<template>
  <div>
    <input v-if="currentView == 'editing'" type="radio" name="current-view" value="editing" checked />
    <input v-if="currentView == 'submission'" type="radio" name="current-view" value="submission" />
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: () => {
    return {
      currentView: 'editing'
    }
  }
}
</script>

<style scoped>
</style>
