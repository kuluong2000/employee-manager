import Vue from "vue";
import VueRouter from "vue-router";

/* Layout */
import Layout from "../components/Layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        component: () => import("../views/Dashboard"),
        name: "Dashboard",
      },
      {
        path: "/user",
        name: "dashboard",
        component: () => import("../views/User"),
      },
      {
        path: "/employee",
        name: "dashboard",
        component: () => import("../views/Employee"),
      },
      {
        path: "/facilities",
        name: "dashboard",
        component: () => import("../views/Facilities"),
      },
      {
        path: "/department",
        name: "dashboard",
        component: () => import("./../views/Department"),
      },
      {
        path: "/position",
        name: "dashboard",
        component: () => import("./../views/Position"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./../views/Login"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
