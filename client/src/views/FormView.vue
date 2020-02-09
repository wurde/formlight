<template>
  <div id="home" class="page">
    <Header />
    <FormListLink />

    <div v-if="error" class="text-error">
      {{error}}
    </div>

    <div class="row py-0">
      <div class="col-90 d-flex-1">
        <h1 class="form-title">{{formTitle}}</h1>
      </div>
      <div class="col-10 d-flex-0 d-flex justify-content-center align-self-flex-end">
        <button type="button" v-on:click.prevent="removeForm(index, $event)" class="btn-remove-field text-danger py-10 px-20" tabindex="0">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
    <hr/>

    <div class="text-align-right float-right" v-on:toggleIsEditing="toggleIsEditing" v-bind:isEditing="isEditing">
      <i v-show="isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-file-alt icon" tabindex="0"></i>
      <i v-show="!isEditing" v-on:click="$emit('toggleIsEditing')" class="fas fa-edit icon" tabindex="0"></i>
    </div>
    <Main v-bind:isEditing="isEditing" />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import FormListLink from '../components/FormListLink.vue';
import Main from '../components/Main.vue';
import config from '../config';
import axios from 'axios';

const env = process.env.NODE_ENV;
const backendUrl = config[env].backendUrl;

export default {
  name: "FormView",
  // Tip: avoid mistake of passing an array to "components".
  components: {
    Header,
    FormListLink,
    Main
  },
  data: function() {
    return {
      username: localStorage.getItem('username'),
      formTitle: localStorage.getItem('formTitle'),
      isEditing: localStorage.getItem("isEditing") == "true" || false,
      error: null
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    toggleIsEditing() {
      localStorage.setItem("isEditing", !this.isEditing)
      this.isEditing = !this.isEditing
    },
    fetchForm() {
      axios.get(backendUrl + `/forms/${this.$route.params.id}`)
      .then(res => {
        this.form = res.data;
      }).catch(err => {
        alert(err);
      })
    },
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
  },
  created() {
    localStorage.setItem("isEditing", this.isEditing);
    this.fetchForm();
  }
}
</script>

<style scoped>
.icon {
  font-size: 32px;
  cursor: pointer;
  outline: none;
}

.icon:focus, .icon:hover {
  text-shadow: 0 5px 30px #EEC480;
}

.form-title {
  padding-top: 20px;
  margin-bottom: 0px;
}
</style>
