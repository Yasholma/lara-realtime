require("./bootstrap");

window.Vue = require("vue");
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import router from "./routes/routes";

Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.component("AppHome", require("./components/AppHome.vue").default);

const app = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    router
});
