<template>
  <h1 v-if="type === 'h1'">{{text}}</h1>
  <h2 v-else-if="type === 'h2'">{{text}}</h2>
  <h3 v-else-if="type === 'h3'">{{text}}</h3>
  <h4 v-else-if="type === 'h4'">{{text}}</h4>
  <h5 v-else-if="type === 'h5'">{{text}}</h5>
  <h6 v-else-if="type === 'h6'">{{text}}</h6>
  <h2 v-else>{{text}}</h2>
</template>

<script>
export default {
  name: 'Heading',
  props: ['type', 'text']
}
</script>

<style scoped>
</style>
