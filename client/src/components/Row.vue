<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Row'
}
</script>

<style scoped>
.row {
  display: flex;
  padding: 10px 0px;
}
</style>
