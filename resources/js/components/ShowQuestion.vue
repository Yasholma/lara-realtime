<template>
  <v-card style="margin: 1rem">
    <v-container fluid>
      <v-card-title>
        <div>
          <div class="headline">{{ question.title }}</div>
          <small class="grey--text"
            >{{ question.created_at }} By {{ question.user }}</small
          >
        </div>
        <v-spacer></v-spacer>
        <v-btn color="teal" dark>{{ repliesCount }} Replies</v-btn>
      </v-card-title>

      <v-card-text v-html="body"></v-card-text>
      <v-card-actions v-if="ownQuestion">
        <v-btn icon small @click="editQuestion">
          <v-icon color="orange">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small @click="destroyQuestion">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import User from "../helpers/User";
export default {
  props: ["question"],
  data() {
    return {
      ownQuestion: User.ownsQuestion(this.question.user_id),
    };
  },
  computed: {
    body() {
      return md.parse(this.question.body);
    },
    repliesCount: {
      get: function () {
        return this.question.reply_count;
      },
      set: function (newCount) {
        this.question.reply_count += newCount;
      },
    },
  },
  methods: {
    async destroyQuestion() {
      await axios
        .delete(`/questions/${this.question.slug}`)
        .then(() => {
          this.$router.push({ name: "forum" });
        })
        .catch((err) => console.log(err));
    },
    editQuestion() {
      EventBus.$emit("startEditing");
    },
    listen() {
      EventBus.$on("increase-count", () => {
        this.repliesCount = 1;
      });

      EventBus.$on("decrease-count", () => {
        this.repliesCount = -1;
      });
    },
  },
  mounted() {
    this.listen();
  },
};
</script>

<style></style>
