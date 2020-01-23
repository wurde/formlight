<template>
  <div>
    <i v-show="isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-file-alt icon"></i>
    <i v-show="!isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-edit icon"></i>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['isEditing'],
  data: function() {
    return {
      currentView: 'editing'
    }
  },
  methods: {
    toggleView: function() {
      this.currentView = this.currentView == 'editing' ? 'submission' : 'editing'
    }
  }
}
</script>

<style scoped>
.icon {
  font-size: 32px;
  cursor: pointer;
  padding: 10px 16px;
}

.icon:hover {
  text-shadow: 0 5px 30px #BBB;
}
</style>
