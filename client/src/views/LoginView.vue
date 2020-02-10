<template>
  <main id="login" class="page">
    <div class="container justify-content-center text-align-center">
      <Heading type="h1" text="Login" />

      <form @submit="loginForm" method="post">
        <TextError v-bind:error="error" />

        <div class="input-group">
          <input id="input-username" type="text" v-model="username" placeholder="Username" autofocus />
        </div>
        <button type="submit">Enter</button>
      </form>
    </div>
  </main>
</template>

<script>
import Heading from "../components/Heading.vue";
import TextError from "../components/TextError.vue";
import config from "../config";
import axios from "axios";

const env = process.env.NODE_ENV;
const backendURL = config[env].backendUrl;

export default {
  name: "LoginView",
  components: {
    Heading,
    TextError,
  },
  data: () => {
    return {
      "username": '',
      error: null
    }
  },
  methods: {
    loginForm(e) {
      e.preventDefault();

      if (this.username.length == 0) {
        this.error = "Username is required";
        return
      } else {
        this.error = null;
      }

      axios.post(backendURL + "/users", { username: this.username })
      .then(() => {
        localStorage.setItem("username", this.username);
        this.$router.push("/");
      }).catch(err => {
        this.error = err.response.data.message;
      })
    }
  }
}
</script>

<style scoped>
main {
  margin: 0 auto;
}

h1 {
  display: flex;
}

label {
  display: inline-block;
  font-weight: bold;
}

input {
  width: 100%;
  height: 2em;
  padding: 15px;
  margin: 20px 0px;
  border-radius: 5px;
  border: 1px solid #CBDBEA;
  font-size: 18px;
  outline: none;
}

input:focus {
  box-shadow: 0 3px 15px #CBDBEA;
}

button {
  width: 100%;
  height: 3em;
  background-color: #FFF;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  border: none;
  border: 1px solid #7FB8A4;
  color: #7FB8A4;
  outline: none;
}
button:focus, button:hover {
  background-color: #7FB8A4;
  color: #FFF;
}

form {
  background-color: #FDFDFE;
  border: 1px solid #DDD;
  padding: 25px;
}
</style>
