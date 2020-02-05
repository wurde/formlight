/**
 * Dependencies
 */

import Vue from "vue";
import router from "./router";
import App from "./App.vue";

/**
 * Config
 */

Vue.config.devtools = true;

/**
 * Mount application to DOM
 */

new Vue({
  el: "#app",
  router,
  render: createElement => {
    // 1st arg: {String | Object | Function}
    // An HTML tag name, component options, or async
    // function resolving to one of these. Required.
    return createElement(App)
  }
});
