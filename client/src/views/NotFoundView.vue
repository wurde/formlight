<template>
  <div id="not-found" class="page">
    <h1>Not Found</h1>
    <router-link to="/">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
  data: function() {
    return {
      username: localStorage.getItem('username')
    }
  }
}
</script>
