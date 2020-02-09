/**
 * Dependencies
 */

import Vue from "vue";
import Router from "vue-router";

import FormListView from "../views/FormListView.vue";
import FormEditView from "../views/FormEditView.vue";
import FormView from "../views/FormView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import SubmissionsView from "../views/SubmissionsView.vue";

/**
 * Mount plugin
 */

Vue.use(Router);

/**
 * Define navigation guards
 */

function requireUsername(to, from, next) {
  if (!localStorage.getItem("username")) {
    next("/login");
  } else {
    next();
  }
}

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
    { path: "/", redirect: "/forms" },
    {
      name: "FormListView",
      path: "/forms",
      component: FormListView,
      beforeEnter: requireUsername
    },
    {
      name: "FormEditView",
      path: "/forms/:id/edit",
      component: FormEditView,
      beforeEnter: requireUsername
    },
    {
      name: "FormView",
      path: "/forms/:id",
      component: FormView,
      beforeEnter: requireUsername
    },
    {
      name: "SubmissionsView",
      path: "/forms/:id/submissions",
      component: SubmissionsView,
      beforeEnter: requireUsername
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
