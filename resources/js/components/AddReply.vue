<template>
  <v-container>
    <vue-simplemde v-model="body" />
    <v-btn @click="clearField">Clear</v-btn>
    <v-btn color="teal" dark @click="storeReply">Send</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({ body: "" }),
  props: ["qSlug"],
  methods: {
    clearField() {
      this.body = "";
    },
    async storeReply() {
      if (!this.body) {
        alert("Oga abi na Hanty write something first na");
        return;
      }
      await axios
        .post(`/questions/${this.qSlug}/replies`, { body: this.body })
        .then((res) => {
          EventBus.$emit("replyAdded", res.data.data);
          this.clearField();
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
