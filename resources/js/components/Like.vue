<template>
  <div>
    <v-btn icon @click="likeIt">
      <v-icon :color="color">mdi-heart</v-icon>
    </v-btn>
    <span class="mt-1 d-inline-block">{{ count }}</span>
  </div>
</template>

<script>
import User from "../helpers/User";
export default {
  data() {
    return { liked: this.reply.liked, count: this.reply.likes_count };
  },
  props: ["reply"],
  computed: {
    color() {
      return this.liked ? "red" : "red lighten-4";
    },
  },
  methods: {
    likeIt() {
      if (User.loggedIn()) {
        !this.liked ? this.incr() : this.decr();
        this.liked = !this.liked;
      }
    },
    async incr() {
      await axios
        .post(`/replies/${this.reply.id}/like`)
        .then((res) => {
          this.count++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async decr() {
      await axios
        .delete(`/replies/${this.reply.id}/like`)
        .then((res) => {
          this.count--;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
