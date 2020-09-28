<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar>
      <v-toolbar-title>
        <router-link to="/" style="text-decoration: none; color: #212226"
          >CyberCode</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <app-notification v-if="loggedIn"></app-notification>

      <div class="hidden-xs-and-down">
        <router-link
          v-for="link in visibleLinks"
          :key="link.title"
          :to="link.to"
        >
          <v-btn text>{{ link.title }}</v-btn>
        </router-link>
      </div>
    </v-toolbar>
  </v-card>
</template>

<script>
import User from "../helpers/User";
import AppNotification from "./AppNotification";
export default {
  data: () => ({
    loggedIn: User.loggedIn(),
    links: [
      { title: "Forum", to: "/forum", show: true },
      { title: "Login", to: "/login", show: !User.loggedIn() },
      { title: "Register", to: "/register", show: !User.loggedIn() },
      { title: "Ask Question", to: "/ask", show: User.loggedIn() },
      { title: "Category", to: "/category", show: User.loggedIn() },
      { title: "Logout", to: "/logout", show: User.loggedIn() },
    ],
  }),
  components: {
    AppNotification,
  },
  computed: {
    visibleLinks() {
      return this.links.filter((link) => link.show);
    },
  },
  created: () => {
    EventBus.$on("logout", () => {
      User.logout();
    });
  },
};
</script>
