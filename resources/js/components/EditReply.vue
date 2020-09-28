<template>
  <div style="padding: 1rem">
    <vue-simplemde v-model="reply.reply" />
    <v-btn @click="cancelUpdating" class="mr-2">Cancel</v-btn>
    <v-btn color="teal" dark @click="updateReply">Update</v-btn>
  </div>
</template>

<script>
export default {
  props: ["reply"],
  methods: {
    cancelUpdating(reply) {
      EventBus.$emit("cancel-editing", reply);
    },
    async updateReply() {
      await axios
        .patch(`/questions/${this.reply.qSlug}/replies/${this.reply.id}`, {
          body: this.reply.reply,
        })
        .then((res) => {
          this.cancelUpdating(this.reply.reply);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

