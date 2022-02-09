import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import employee from "./mokup-data/employee.json";
import departments from "./mokup-data/departments.json";
import facilities from "./mokup-data/facilities.json";
import payment from "./mokup-data/payment.json";
import position from "./mokup-data/position.json";
import user from "./mokup-data/user.json";
localStorage.setItem("employee", JSON.stringify(employee));
localStorage.setItem("departments", JSON.stringify(departments));
localStorage.setItem("facilities", JSON.stringify(facilities));
localStorage.setItem("payment", JSON.stringify(payment));
localStorage.setItem("payment", JSON.stringify(payment));
localStorage.setItem("position", JSON.stringify(position));
localStorage.setItem("user", JSON.stringify(user));

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
