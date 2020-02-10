<template>
  <div v-if="error" class="text-error">
    {{error}}
  </div>
</template>

<script>
export default {
  name: 'TextError',
  props: ['error']
}
</script>

<style scoped>
.text-error {
  color: red;
  font-weight: bold;
}
</style>
