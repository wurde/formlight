<template>
  <div>
    <Form />
    <Submissions />
  </div>
</template>

<script>
import Form from './Form.vue';
import Submissions from './Submissions.vue';

export default {
  name: 'Main',
  props: ['isEditing'],
  components: {
    Form,
    Submissions,
  }
}
</script>

<style scoped>
</style>
