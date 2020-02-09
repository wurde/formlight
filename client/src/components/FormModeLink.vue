<template>
  <div class="text-align-right float-right">
    <router-link :to="linkTo">
      <i class="fas fa-file-alt icon" tabindex="0"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FormModeLink",
  computed: {
    linkTo: function() {
      return "/forms/" + this.$route.params.id
    }
  }
}
</script>
