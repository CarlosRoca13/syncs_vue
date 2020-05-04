<template>
  <div class="main" style="background-color: #bf4222">
    <v-container class="infoContainer">
      <v-row>
        <v-col cols="2" md="2"  class="imageContainer" >
          <v-img
            v-if="avatar==null"
            src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
            width="200"
          ></v-img>
          <v-img v-else :src="avatar" width="200" height="200"></v-img>
        </v-col>
        <v-col class="artistNameContainer" cols="10" sm="2" md="4">
          <span class="display-2 font-weight-light">{{username}}</span>
        </v-col>
      </v-row>
      <div style="padding-top:30px">
      <v-divider class="dividerArtist"></v-divider>
      </div>
      <v-row>
        <div class="my-songs-table">
          <v-row>
            <div>
              <span class="headline">Songs</span>
            </div>
            <v-spacer></v-spacer>
            <div class="songSearchbar">
            <v-text-field
            color="#38A694"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </div>
          </v-row>
          
          <v-data-table :headers="headers" :items="sheets" :search="search"></v-data-table>
        </div>
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
.songSearchbar{
  width: 30%;
  padding-bottom: 20px;
  align-self:flex-end;
}
.my-songs-table {
  padding: 50px;
  width: 70%;
}
.artistNameContainer {
  padding-top: 30px;
}
.imageContainer{
  text-align: center;
  padding-left: 30px;
}
.infoContainer {
  background: white;
  border-radius: 10px;
  width: 95%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.dividerArtist{
  background: #38A694;
  margin: auto;
}
</style>