<template>
  <v-container>
    <v-form @submit.prevent="addCategory" class="mb-4">
      <v-row>
        <v-col cols="8">
          <v-text-field
            v-model="name"
            label="Name"
            type="text"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="green" dark type="submit" v-if="!cat">Save</v-btn>
      <div v-else>
        <v-btn color="teal" dark type="submit">Update</v-btn>
        <v-btn color="yellow" dark type="button" @click="cancelEditing"
          >Cancel</v-btn
        >
      </div>
    </v-form>
    <v-divider />
    <div class="mt-5">
      <v-skeleton-loader
        v-if="loadingCat"
        :loading="loadingCat"
        height="150"
        type="card"
      >
      </v-skeleton-loader>

      <v-card v-if="!loadingCat">
        <v-toolbar color="indigo" dark>
          <v-card-title>Categories</v-card-title>
        </v-toolbar>
        <v-list>
          <v-list-item-group color="primary">
            <div v-for="category in categories" :key="category.id">
              <v-list-item>
                <v-list-item-icon @click="editCategory(category.slug)">
                  <v-icon color="indigo">mdi-pencil</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="category.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon @click="deleteCategory(category.slug)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-divider />
            </div>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: "",
    loadingCat: false,
    categories: [],
    cat: null,
  }),
  methods: {
    async addCategory() {
      if (this.cat) {
        this.updateCategory();
      } else {
        this.storeCategory();
      }
    },
    async storeCategory() {
      if (!this.name) {
        alert("Enter something abeg");
        return;
      }
      await axios
        .post("/categories", { name: this.name })
        .then((res) => {
          this.categories.unshift(res.data);
          this.name = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateCategory() {
      await axios
        .patch(`/categories/${this.cat.slug}`, { name: this.name })
        .then((res) => {
          this.categories.unshift(res.data);
          this.name = "";
          this.cat = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editCategory(slug) {
      this.cat = this.categories.find((cat) => cat.slug === slug);
      this.name = this.cat.name;
      this.categories = this.categories.filter((cat) => cat.slug !== slug);
    },
    cancelEditing() {
      this.name = "";
      this.categories.unshift(this.cat);
      this.cat = null;
    },
    async deleteCategory(catSlug) {
      await axios
        .delete(`/categories/${catSlug}`)
        .then((res) => {
          this.categories = this.categories.filter(
            (cat) => cat.slug !== catSlug
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCategories() {
      this.loadingCat = true;
      await axios
        .get("/categories")
        .then((res) => {
          this.loadingCat = false;
          this.categories.push(...res.data.data);
        })
        .catch((err) => {
          this.loadingCat = false;
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style>
</style>
