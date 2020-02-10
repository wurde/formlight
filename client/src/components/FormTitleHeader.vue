<template>
  <header>
    <Row class="py-0">
      <div class="col-90 d-flex-1">
        <Heading type="h1" class="form-title" v-bind:text="formTitle" />
      </div>

      <div class="col-10 d-flex-0 d-flex justify-content-center align-self-flex-end">
        <button type="button" v-on:click.prevent="removeForm(index, $event)" class="btn-remove btn-remove-form text-danger py-10 px-20" tabindex="0">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </Row>

    <hr/>
  </header>
</template>

<script>
import Heading from "../components/Heading.vue";
import Row from "../components/Row.vue";
import config from "../config";
import axios from "axios";

const env = process.env.NODE_ENV;
const backendUrl = config[env].backendUrl;

export default {
  name: "FormTitleHeader",
  components: {
    Heading,
    Row,
  },
  data: function() {
    return {
      formTitle: localStorage.getItem("formTitle")
    }
  },
  methods: {
    removeForm() {
      const yes = confirm("Are you sure? This action is permanent.")

      if (yes) {
        axios.delete(backendUrl + `/forms/${this.$route.params.id}`)
        .then(() => {
          this.$router.push('/forms');
        }).catch(err => {
          this.error = err.response.data.message;
        })
      }
    }
  }
}
</script>

<style scoped>
.form-title {
  padding-top: 20px;
  margin-bottom: 0px;
}
</style>
