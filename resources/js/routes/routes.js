import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Register from "../components/Register";
import Forum from "../components/Forum";
import Logout from "../components/Logout";

Vue.use(VueRouter);

const routes = [
    { path: "/login", component: Login },
    { path: "/logout", component: Logout },
    { path: "/register", component: Register },
    { path: "/forum", component: Forum, name: "forum" }
];

const router = new VueRouter({
    routes,
    hashbang: false,
    mode: "history"
});

export default router;
