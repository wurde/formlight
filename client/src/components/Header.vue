<template>
  <div class="header">
    <h3>Welcome {{username}}! <small>(<a @click="signout" href="#">Sign out</a>)</small></h3>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function() {
    return {
      username: localStorage.getItem('username')
    }
  },
  methods: {
    signout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 20px;
}
</style>
