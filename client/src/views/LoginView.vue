<template>
  <div id="login">
    <h3>Login</h3>
    <form @submit="loginForm" method="post">
      <label for="input-username">Username</label>
      <input id="input-username" type="text" v-model="username" autofocus />
      <button type="submit">Enter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: () => {
    return {
      "username": ''
    }
  },
  methods: {
    loginForm(e) {
      e.preventDefault();
      localStorage.setItem("formUser", this.username);
      this.$router.push("/");
    }
  }
}
</script>
