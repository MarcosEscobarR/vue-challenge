<template>
  <div>
    <div class="title-container ">
      <v-card class="justify-center ">
        <v-card-title>Busca el nombre de tu libro favorito!</v-card-title>
        <v-card-actions>
          <v-form @submit.prevent="search" style="width: 100%" v-model="formValid">
            <v-row>
              <v-col>
                <v-text-field outlined placeholder="Buscar..." v-model="searchInput" :rules="rules"/>
              </v-col>
              <v-col cols="2" align-self="end">
                <v-btn color="red" :disabled="!formValid" @click.prevent="search">Buscar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-actions>
      </v-card>
    </div>

    <v-container>
      <div v-if="loading" class="loader-container">
        <v-progress-circular indeterminate width="7" size="70"/>
      </div>
      <div class="mt-5" v-else-if="book">
        <p class="font-weight-bold">Resultados: {{ book.num_found }}</p>
        <div v-for="(item, index) in book.docs" class="py-4">
          <book :title="item.title"
                :author=" item.author_name ? item.author_name[0]: '-' "
                :edition="item.edition_count" :book-url="item.key" :key="index"/>
        </div>

        <div class="text-center">
          <v-pagination
            v-model="page"
            color="blue"
            :length="(this.book.numFound / 100).toFixed()"
            total-visible="7"
            circle
          ></v-pagination>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import Book from "~/components/Book";

export default {
  components: {Book, Loading},
  watch: {
    page: {
      handler() {
        this.search()
      }
    }
  },
  data: () => ({
    searchInput: null,
    formValid: false,
    loading: false,
    page: 1,
    book: null,
    rules: [
      value => !!value || 'Campo Requerido'
    ],

  }),
  methods: {
    search() {
      this.loading = true;
      fetch(`http://openlibrary.org/search.json?title=${this.searchInput}&page=${this.page}`)
        .then((response) => response.json())
        .then((r) => {
          this.loading = false;
          this.book = r;
        })
        .catch(e => console.log(e))
    }
  }
}
</script>
<style scoped>
.title-container {
  width: 100%;
  height: 250px;
  background-color: #ACE9B7;
  padding: 10px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loader-container {
  margin-top: 30px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
