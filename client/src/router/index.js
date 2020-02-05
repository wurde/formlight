/**
 * Dependencies
 */

import Vue from "vue";
import Router from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";

/**
 * Mount plugin
 */

Vue.use(Router);

/**
 * Define router
 *
 * Each route maps to a component. The component can be
 * from `Vue.extend()` or an options object.
 */

export default new Router({
  // default mode is "hash" mode using # in URL.
  mode: "history",
  routes: [
    {
      name: "HomeView",
      path: "/",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("formUser")) {
          next();
        } else {
          next("/login");
        }
      }
    },
    {
      name: "LoginView",
      path: "/login",
      component: LoginView
    },
    { path: "/signin", redirect: "/login" },
    {
      // This matches everything. A catch-all to render a 404 page.
      name: "NotFoundView",
      path: "*",
      component: NotFoundView
    }
  ]
});
