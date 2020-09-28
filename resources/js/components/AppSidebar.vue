<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :loading="loading"
      height="150"
      type="card"
    >
    </v-skeleton-loader>

    <v-card v-if="!loading">
      <v-toolbar color="indigo" dark>
        <v-card-title>Categories</v-card-title>
      </v-toolbar>
      <v-list>
        <v-list-item-group color="primary">
          <div v-for="category in categories" :key="category.id">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-text="category.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </div>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({ categories: [], loading: false }),
  mounted() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      this.loading = true;
      await axios
        .get("/categories")
        .then((res) => {
          this.loading = false;
          this.categories.push(...res.data.data);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
};
</script>

