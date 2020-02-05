<template>
  <div class="header">
    <h3>Welcome {{formUser}}! <small>(<a @click="signout" href="#">Sign out</a>)</small></h3>
    <div class="text-align-right float-right">
      <i v-show="isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-file-alt icon" tabindex="0"></i>
      <i v-show="!isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-edit icon" tabindex="0"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['isEditing'],
  data: function() {
    return {
      formUser: localStorage.getItem('formUser')
    }
  },
  methods: {
    signout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  }
}
</script>

<style scoped>
h3 {
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 20px;
}

.icon {
  font-size: 32px;
  cursor: pointer;
  outline: none;
}

.icon:focus, .icon:hover {
  text-shadow: 0 5px 30px #EEC480;
}
</style>
