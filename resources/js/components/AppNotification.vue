<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark icon v-bind="attrs" v-on="on">
          <v-icon :color="color">mdi-bell</v-icon>{{ unreadCount }}
        </v-btn>
      </template>
      <v-list>
        <!-- Unread -->
        <v-list-item v-for="(ur, index) in unread" :key="ur.id">
          <router-link :to="ur.path">
            <v-list-item-title @click="readNotification(index, ur.id)">{{
              ur.question
            }}</v-list-item-title>
          </router-link>
        </v-list-item>

        <v-divider />

        <!-- Read -->
        <v-list-item v-for="rd in read" :key="rd.id">
          <v-list-item-title>{{ rd.question }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import User from "../helpers/User";
export default {
  data: () => ({ read: null, unread: null, unreadCount: 0 }),
  mounted() {
    if (User.loggedIn()) {
      this.getNotifications();
    }
  },
  computed: {
    color() {
      return this.unreadCount > 0 ? "red" : "red lighten-4";
    },
  },
  methods: {
    async readNotification(index, notifyId) {
      await axios
        .post(`/markAsRead/`, { id: notifyId })
        .then(() => {
          let justRead = this.unread.splice(index, 1);
          this.read.push(justRead[0]);
          this.unreadCount -= 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getNotifications() {
      await axios
        .post("/notifications")
        .then((res) => {
          this.read = res.data.read;
          this.unread = res.data.unread;
          this.unreadCount = res.data.unread.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
