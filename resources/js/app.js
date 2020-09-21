require("./bootstrap");

window.Vue = require("vue");
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import router from "./routes/routes";
import axios from "axios";
import VueSimplemde from "vue-simplemde";
import md from "marked";

axios.defaults.baseURL = "/api/";

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueSimplemde);

window.EventBus = new Vue();
window.md = md;

Vue.component("vue-simplemde", VueSimplemde);
Vue.component("AppHome", require("./components/AppHome.vue").default);

const app = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    router
});
