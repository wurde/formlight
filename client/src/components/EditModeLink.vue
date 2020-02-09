<template>
  <div class="text-align-right float-right">
    <router-link :to="linkTo">
      <i class="fas fa-edit icon" tabindex="0"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "EditModeLink",
  computed: {
    linkTo: function() {
      return "/forms/" + this.$route.params.id + "/edit"
    }
  }
}
</script>
