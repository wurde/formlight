<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>
