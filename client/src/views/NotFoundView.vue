<template>
  <div id="not-found">
    <h1>Not Found</h1>
    <router-link :to="{ name: 'HomeView' }">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundView"
}
</script>

<style scoped>
</style>
