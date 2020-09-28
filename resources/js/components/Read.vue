<template>
  <v-container>
    <edit-question v-if="isEditing" :question="question"></edit-question>
    <show-question
      :question="question"
      :isEditing="isEditing"
      v-if="question && !isEditing"
    ></show-question>
    <replies
      v-if="question"
      :replies="question.replies"
      :qSlug="question.slug"
    ></replies>
    <add-reply v-if="question" :qSlug="question.slug"></add-reply>
  </v-container>
</template>

<script>
import ShowQuestion from "./ShowQuestion";
import EditQuestion from "./EditQuestion";
import Replies from "./Replies";
import AddReply from "./AddReply";
export default {
  data: () => ({
    question: null,
    isEditing: false,
    questionBeforeEditing: { title: "", body: "" },
  }),
  components: {
    ShowQuestion,
    EditQuestion,
    Replies,
    AddReply,
  },
  created() {
    this.listen();
    this.getQuestion();
  },
  methods: {
    listen() {
      EventBus.$on("startEditing", () => {
        this.isEditing = true;
        this.questionBeforeEditing.title = this.question.title;
        this.questionBeforeEditing.body = this.question.body;
      });

      EventBus.$on("cancelEditing", (quest) => {
        console.log(quest);
        if (quest.title !== this.question.title) {
          this.question.title = this.questionBeforeEditing.title;
          this.questionBeforeEditing.title = "";
        }
        if (quest.body !== this.question.body) {
          this.question.body = this.questionBeforeEditing.body;
          this.questionBeforeEditing.body = "";
        }
        this.isEditing = false;
      });
    },
    async getQuestion() {
      await axios
        .get(`/questions/${this.$route.params.slug}`)
        .then((res) => {
          this.question = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
