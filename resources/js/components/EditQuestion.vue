<template>
    <v-card fluid>
        <v-form @submit.prevent="updateQuestion">
            <v-container>
                <v-row>
                    <v-col cols="5" md="4">
                        <v-text-field
                            v-model="form.title"
                            label="Title"
                            type="text"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <vue-simplemde v-model="form.body" ref="markdownEditor" />
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
        form: {
            title: "",
            body: ""
        },
        categories: [],
        errors: []
    }),
    props: ["question"],
    created() {
        this.form = this.question;
    },
    methods: {
        async updateQuestion() {
            await axios
                .patch(`/questions/${this.question.slug}`, this.form)
                .then(() => {
                    this.cancelEditing();
                })
                .catch(err => console.log(err));
        },
        cancelEditing() {
            EventBus.$emit("cancelEditing");
        }
    }
};
</script>
