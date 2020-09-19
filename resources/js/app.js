require("./bootstrap");

window.Vue = require("vue");
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import router from "./routes/routes";
import axios from "axios";

axios.defaults.baseURL = "/api/";

Vue.use(VueRouter);
Vue.use(Vuetify);

window.EventBus = new Vue();

Vue.component("AppHome", require("./components/AppHome.vue").default);

const app = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    router
});
