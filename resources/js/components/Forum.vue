<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs8 style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
        <question v-for="question in questions" :key="question.id" :question="question"></question>
      </v-flex>Sidebar
    </v-layout>
  </v-container>
</template>

<script>
import Question from "./Question";
export default {
  data: () => ({ questions: [] }),
  components: {
    Question,
  },
  props: ["question"],
  async created() {
    await axios
      .get("/questions")
      .then((res) => {
        this.questions.push(...res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
