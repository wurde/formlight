<template>
  <div id="form-list" class="page">
    <h1>Forms</h1>

    <div class="row">
      <ul>
        <li>Survey 1</li>
        <li>Survey 2</li>
        <li>Survey 3</li>
      </ul>
    </div>

    <div class="row">
      <form @submit.prevent="createList">
        <input type="text" name="title" placeholder="Survey" v-model="form.title" />
        <button type="button" @click.prevent="addForm" class="btn-add" tabindex="0">
          <i class="fa fa-plus icon"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormListView",
  data: function() {
    return {
      form: {}
    }
  },
  methods: {
    addForm() {
      alert("addForm")
    },
  }
}
</script>

<style scoped>
</style>
