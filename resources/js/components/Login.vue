<template>
    <v-form @submit.prevent="login">
        <v-container>
            <v-row>
                <v-col cols="5" md="4">
                    <v-text-field
                        v-model="form.email"
                        label="E-mail"
                        type="email"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5" md="4">
                    <v-text-field
                        v-model="form.password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-btn color="green" type="submit">Login</v-btn>
        </v-container>
    </v-form>
</template>

<script>
import User from "../helpers/User";
export default {
    data: () => ({
        form: {
            email: "",
            password: ""
        }
    }),
    methods: {
        login() {
            User.login(this.form);
        }
    }
};
</script>
