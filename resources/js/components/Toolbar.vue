<template>
    <v-card color="grey lighten-4" flat tile>
        <v-toolbar>
            <v-toolbar-title>
                <router-link
                    to="/"
                    style="text-decoration: none; color: #212226;"
                >
                    CyberCode
                </router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>

            <div class="hidden-sm-and-down">
                <router-link to="/">
                    <v-btn text>Forum</v-btn>
                </router-link>
                <router-link to="/question">
                    <v-btn text>Ask Question</v-btn>
                </router-link>
                <router-link to="/category">
                    <v-btn text>Category</v-btn>
                </router-link>
                <router-link to="/login">
                    <v-btn text>Login</v-btn>
                </router-link>
            </div>
        </v-toolbar>
    </v-card>
</template>
