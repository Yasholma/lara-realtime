<template>
  <v-form @submit.prevent="register">
    <v-container>
      <v-row>
        <v-col cols="5" md="4">
          <v-text-field v-model="form.name" label="Full Name" type="text" required></v-text-field>
          <small class="red--text" v-if="errors.name">
            {{
            errors.name[0]
            }}
          </small>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" md="4">
          <v-text-field v-model="form.email" label="E-mail" type="email" required></v-text-field>
          <small class="red--text" v-if="errors.email">
            {{
            errors.email[0]
            }}
          </small>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" md="4">
          <v-text-field v-model="form.password" label="Password" type="password" required></v-text-field>
          <small class="red--text" v-if="errors.password">
            {{
            errors.password[0]
            }}
          </small>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" md="4">
          <v-text-field
            v-model="form.password_confirmation"
            label="Confirm Password"
            type="password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="green" type="submit">Register</v-btn>
      <router-link to="/login">
        <v-btn>Login</v-btn>
      </router-link>
    </v-container>
  </v-form>
</template>

<script>
import User from "../helpers/User";
export default {
  data: () => ({
    form: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    errors: {},
  }),
  created() {
    if (User.loggedIn()) {
      this.$router.push({ name: "forum" });
    }
  },
  methods: {
    async register() {
      await User.register(this.form)
        .then(() => {
          this.form.name = "";
          this.form.email = "";
          this.form.password = "";
          this.form.password_confirmation = "";
          // Change route
          this.$router.push({ name: "forum" });
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>
