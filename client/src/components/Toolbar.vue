<template>
  <div class="toolbar">
    <button type="button" id="create-form">
      Create Form
    </button>
  </div>
</template>

<script>
export default {
  name: 'Toolbar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.toolbar {
  display: flex;
  background-color: #EEE;
  border: 1px solid #CCC;
  padding: 5px;
}

button {
  background-color: #5588FF;
  color: #FFF;
  padding: 10px 55px;
  font-size: 18px;
  border-radius: 25px;
  outline: none;
}
</style>
