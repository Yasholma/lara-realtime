<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap class="pt-4">
      <v-flex
        xs8
        style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem"
      >
        <v-skeleton-loader
          v-if="loading"
          :loading="loading"
          height="150"
          type="card"
        >
        </v-skeleton-loader>
        <question
          v-for="question in questions"
          :key="question.id"
          :question="question"
          v-else
        ></question>
      </v-flex>
      <v-flex xs4>
        <app-sidebar></app-sidebar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Question from "./Question";
import AppSidebar from "./AppSidebar";
export default {
  data: () => ({ questions: [], loading: false }),
  components: {
    Question,
    AppSidebar,
  },
  props: ["question"],
  async created() {
    this.loading = true;
    await axios
      .get("/questions")
      .then((res) => {
        this.loading = false;
        this.questions.push(...res.data.data);
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  },
};
</script>
