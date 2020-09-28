<template>
  <v-container>
    <reply
      v-for="reply in allReplies"
      :key="reply.id"
      :repliesCount="repliesCount"
      :reply="reply"
    ></reply>
  </v-container>
</template>

<script>
import Reply from "./Reply";
export default {
  props: ["replies", "qSlug"],
  components: { Reply },
  mounted() {
    this.listen();
  },
  methods: {
    listen() {
      EventBus.$on("replyAdded", (reply) => {
        this.allReplies.unshift(reply);
        EventBus.$emit("increase-count");
      });

      EventBus.$on("delete-reply", (repId) => {
        this.destroyReply(repId);
      });
    },

    async destroyReply(repId) {
      await axios
        .delete(`/questions/${this.qSlug}/replies/${repId}`)
        .then(() => {
          this.allReplies = repId;
          EventBus.$emit("decrease-count");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    allReplies: {
      get: function () {
        return this.replies;
      },
      set: function (repId) {
        let ind = this.allReplies.findIndex((rep) => rep.id === repId);
        this.replies.splice(ind, 1);
      },
    },
    repliesCount() {
      return this.replies.length;
    },
  },
};
</script>
