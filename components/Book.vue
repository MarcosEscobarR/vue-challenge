<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-actions style="width: 400px">
          <span><strong>Autor:</strong> {{ author }}</span>
          <v-spacer/>
          <span><strong>Edicion:</strong> {{ edition }}</span>
        </v-card-actions>
      </v-col>
      <v-col align-self="center" class="d-flex"  cols="2" lg="2" md="2" sm="12">
        <div class="pa-5"><a target="_blank" :href="`http://openlibrary.org${bookUrl}`">Ver Libro</a></div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Book",
  props: {
    title: {
      type: String,
      required: true
    }, author: {
      type: String,
      required: true
    }, edition: {
      type: Number,
      required: true
    },
    bookUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
