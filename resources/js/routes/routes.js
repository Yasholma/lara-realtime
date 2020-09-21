import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login";
import Register from "../components/Register";
import Forum from "../components/Forum";
import Logout from "../components/Logout";
import Read from "../components/Read";
import AskQuestion from "../components/AskQuestion";

Vue.use(VueRouter);

const routes = [
    { path: "/login", component: Login },
    { path: "/logout", component: Logout },
    { path: "/register", component: Register },
    { path: "/forum", component: Forum, name: "forum" },
    { path: "/ask", component: AskQuestion, name: "ask" },
    { path: "/questions/:slug", component: Read, name: "read" }
];

const router = new VueRouter({
    routes,
    hashbang: false,
    mode: "history"
});

export default router;
