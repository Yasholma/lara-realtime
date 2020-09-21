<template>
    <v-container>
        <v-form @submit.prevent="askQuestion">
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
                    <v-col cols="5" md="4">
                        <v-autocomplete
                            v-model="form.category_id"
                            :items="categories"
                            item-text="name"
                            item-value="id"
                            label="Category"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <vue-simplemde v-model="form.body" ref="markdownEditor" />
                </v-row>
                <router-link to="/forum">
                    <v-btn>Cancel</v-btn>
                </router-link>
                <v-btn color="teal" type="submit">Submit</v-btn>
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        form: {
            title: "",
            body: "",
            category_id: ""
        },
        categories: [],
        errors: []
    }),
    async created() {
        await axios
            .get("/categories")
            .then(res => {
                this.categories.push(...res.data.data);
            })
            .catch(err => console.log(err));
    },
    methods: {
        async askQuestion() {
            await axios
                .post("/questions", this.form)
                .then(res => {
                    this.$router.push(res.data.path);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                    this.errors = err.response.errors.data;
                });
        }
    }
};
</script>

<style></style>
