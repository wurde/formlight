<template>
  <div id="not-found" class="page">
    <Heading type="h1" text="Not Found" />
    <router-link to="/">Go Home</router-link>
  </div>
</template>

<script>
import Heading from "../components/Header.vue";

export default {
  name: "NotFoundView",
  components: {
    Heading
  },
  data: function() {
    return {
      username: localStorage.getItem('username')
    }
  }
}
</script>
