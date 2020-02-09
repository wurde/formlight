<template>
  <section class="submissions-section">
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-if="error" class="alert-error">
      {{error}}
    </div>

    <div v-show="isEditing" class="editable">
      <h3>Submissions 1</h3>
    </div>

    <div v-show="!isEditing" class="display">
      <div v-if="submissions.length > 0">
        <h3>Submissions for <u>{{submissions[0].title}}</u></h3>

        <table>
          <tr>
            <th v-for="(heading, index) in headings" v-bind:key="index">{{heading}}</th>
          </tr>
          <tr v-for="(row, index) in rows" v-bind:key="index">
            <td v-for="(field,index) in row" v-bind:key="index">{{field}}</td>
          </tr>
        </table>
      </div>

      <div v-else>
        <h3>No submissions yet.</h3>
      </div>
    </div>

    <nav>
      <a v-on:click.prevent="$emit('toggleCurrentView')" class="a-see-form">See form</a>
    </nav>
  </section>
</template>

<script>
import axios from 'axios';
import config from '../config';

const env = process.env.NODE_ENV;
const backendUrl = config[env].backendUrl;

export default {
  name: 'Submissions',
  props: ['isEditing'],
  data: function() {
    return {
      isLoading: false,
      submissions: [],
      error: null,
      show: true
    }
  },
  computed: {
    headings: function() {
      if (this.submissions.length > 0) {
        const fields = JSON.parse(this.submissions[0].fields_json);
        return fields.map(field => field.label);
      } else {
        return [];
      }
    },
    rows: function() {
      if (this.submissions.length > 0) {
        return this.submissions.map(s => JSON.parse(s.answers));
      } else {
        return [];
      }
    }
  },
  created: function() {
    this.fetchSubmissions();
  },
  activated: function() {
    alert("activated");
  },
  methods: {
    fetchSubmissions: function() {
      this.error = null;
      this.isLoading = true;

      axios.get(backendUrl + '/forms/1/submissions')
      .then(res => {
        this.isLoading = false;
        this.submissions = res.data;
      }).catch(err => {
        this.isLoading = false;
        this.error = err;
      })
    }
  }
}
</script>

<style scoped>
.submissions-section {
  padding: 15px;
}

</style>
