<template>
  <div class="my-4">
    <v-card>
      <v-card-title>
        <div class="headline mr-auto">{{ reply.user }}</div>
        <v-spacer />
        <small color="grey" class="mr-1">{{ reply.created_at }}</small>
        <like :reply="reply"></like>
      </v-card-title>
      <v-divider />
      <edit-reply v-if="isEditing" :reply="reply"></edit-reply>
      <v-card-text v-else v-html="replyBody"> </v-card-text>
      <v-divider />

      <v-card-actions v-if="ownsReply && !isEditing">
        <v-btn icon small @click="editReply">
          <v-icon color="orange">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small @click="destroyReply">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import User from "../helpers/User";
import EditReply from "./EditReply";
import Like from "./Like";
export default {
  data: () => ({ isEditing: false, replyBeforeEditing: "" }),
  components: { EditReply, Like },
  props: ["reply"],
  computed: {
    ownsReply() {
      return User.ownsReply(this.reply.uid);
    },
    replyBody() {
      return md.parse(this.reply.reply);
    },
  },
  methods: {
    destroyReply() {
      EventBus.$emit("delete-reply", this.reply.id);
    },
    editReply() {
      this.isEditing = true;
      this.replyBeforeEditing = this.reply.reply;
    },
    listen() {
      EventBus.$on("cancel-editing", (reply) => {
        if (reply !== this.reply.reply) {
          this.reply.reply = this.replyBeforeEditing;
          this.replyBeforeEditing = "";
        }
        this.isEditing = false;
      });
    },
  },
  mounted() {
    this.listen();
  },
};
</script>

