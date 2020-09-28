<template>
  <v-card fluid>
    <v-form @submit.prevent="updateQuestion">
      <v-container>
        <v-row>
          <v-col cols="8" md="8">
            <v-text-field
              v-model="form.title"
              label="Title"
              type="text"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <vue-simplemde v-model="form.body" ref="markdownEditor" />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn @click="cancelEditing">Cancel</v-btn>
          <v-btn color="teal" type="submit">Update</v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    errors: [],
  }),
  props: ["question"],
  created() {
    this.form = this.question;
  },
  methods: {
    async updateQuestion() {
      await axios
        .patch(`/questions/${this.question.slug}`, this.form)
        .then((res) => {
          this.cancelEditing(res.data);
        })
        .catch((err) => console.log(err));
    },
    cancelEditing(quest) {
      EventBus.$emit("cancelEditing", quest);
    },
  },
};
</script>
