<template>
    <div>
        <edit-question v-if="isEditing" :question="question"></edit-question>
        <show-question
            :question="question"
            :isEditing="isEditing"
            v-if="question && !isEditing"
        ></show-question>
    </div>
</template>

<script>
import ShowQuestion from "./ShowQuestion";
import EditQuestion from "./EditQuestion";
export default {
    data: () => ({ question: null, isEditing: false }),
    components: {
        ShowQuestion,
        EditQuestion
    },
    created() {
        this.listen();
        this.getQuestion();
    },
    methods: {
        listen() {
            EventBus.$on("startEditing", () => {
                this.isEditing = true;
            });

            EventBus.$on("cancelEditing", () => {
                this.isEditing = false;
            });
        },
        async getQuestion() {
            await axios
                .get(`/questions/${this.$route.params.slug}`)
                .then(res => {
                    this.question = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style></style>
