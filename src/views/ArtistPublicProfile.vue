<template>
  <div class="main">
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="6" md="4">
          <v-img
            class="avatarImage"
            v-if="avatar==null"
            src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
            width="200"
          ></v-img>
          <v-img v-else :src="avatar" width="200" height="200"></v-img>
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <span>{{username}}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-card>
          <v-card-title>
            Sheets
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="sheets" :search="search"></v-data-table>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "ArtistProfile",
  data() {
    return {
      username: "",
      search: "",
      avatar: null,
      sheets: []
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "#",
          align: "start",
          value: "index"
        },
        {
          text: "Title",
          sortable: false,
          value: "name"
        }
      ];
    }
  },
  methods: {
    async getData() {
      var list = await this.$http.get(
        "http://localhost:8000/api/sheets/client/" + this.$route.params.id
      );

      for (let i = 0; i < list.data.length; i++) {
        list.data[i].index = i;
      }

      this.sheets = list.data;

      this.avatar =
        "http://localhost:8000/api/clients/avatar/" + this.$route.params.id;

      this.username = list.data[0].username;
      console.log(this.username);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style scoped>
</style>