<template>
  <div class="header">
    <i v-show="isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-file-alt icon" tabindex="0"></i>
    <i v-show="!isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-edit icon" tabindex="0"></i>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['isEditing']
}
</script>

<style scoped>
.icon {
  font-size: 32px;
  cursor: pointer;
  padding: 10px 16px;
  outline: none;
}

.icon:focus, .icon:hover {
  text-shadow: 0 5px 30px #EEC480;
}

.header {
  text-align: right;
}
</style>
