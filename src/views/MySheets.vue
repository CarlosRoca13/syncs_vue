<template>
  <div class="main">
    <div style="padding-bottom:20px">
      <span class="display-3">My Songs</span>
    </div>
    <v-container fluid class="filtersContainer">
      <span class="headline white--text">
        Filters
        <v-icon dark>filter_list</v-icon>
      </span>
      <v-row>
        <v-col class="d-flex" cols="4">
          <v-select dark v-model="maingenre" :items="genres" label="Main genre"></v-select>
        </v-col>

        <v-col class="d-flex" cols="4">
          <v-select dark v-model="key" :items="keys" label="Key"></v-select>
        </v-col>

        <v-col class="d-flex" cols="4">
          <v-select dark :items="filters" v-model="currentOrder" label="Order by"></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-row>
      <div v-for="song in filterSongs" :key="song.id" class="songCard">
        <v-col>
          <v-card class="mx-auto" max-width="344" outlined>
            <a @click="changeView(song)">
              <v-img
                
                v-if="song.image==null"
                src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
                width="250"
              ></v-img>
              <v-img v-else :src="song.image" width="250" height="250"></v-img>

              <v-list-item three-line class="cardTitle">
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1 white--text">{{song.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              
            </a>
            <v-card-actions>
                <v-btn text dark @click="eliminate(song)">Eliminate</v-btn>
                <v-spacer></v-spacer>
                <v-btn text dark @click="edit(song)">Edit</v-btn>
              </v-card-actions>
          </v-card>
        </v-col>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "MySheets",
  data() {
    return {
      currentOrder: "None",
      maingenre: "All",
      key: "All",
      songs: [],

      genres: [
        "All",
        "Blues",
        "Classic",
        "Funk",
        "Grunge",
        "Jazz",
        "Metal",
        "Pop",
        "Punk",
        "Reggae",
        "Reggaeton",
        "Rock",
        "Salsa",
        "Techno"
      ],
      keys: [
        "All",
        "A",
        "A#",
        "Ab",
        "Am",
        "A#m",
        "Abm",
        "B",
        "B#",
        "Bb",
        "Bm",
        "B#m",
        "Bbm",
        "C",
        "C#",
        "Cb",
        "Cm",
        "C#m",
        "Cbm",
        "D",
        "D#",
        "Db",
        "Dm",
        "D#m",
        "Dbm",
        "E",
        "E#",
        "Eb",
        "Em",
        "E#m",
        "Ebm",
        "E",
        "E#",
        "Eb",
        "Em",
        "E#m",
        "Ebm",
        "F",
        "F#",
        "Fb",
        "Fm",
        "F#m",
        "Fbm",
        "G",
        "G#",
        "Gb",
        "Gm",
        "G#m",
        "Gbm"
      ],

      filters: ["None", "Downloads", "Likes", "Views", "Name Asc", "Name Desc"]
    };
  },

  computed: {
    filterSongs: function() {
      var vm = this;
      var maingenre = vm.maingenre;
      var key = vm.key;
      var order = vm.currentOrder;
      let result = vm.songs;

      if (maingenre === "All" && key === "All") {
        result = vm.songs;
      } else {
        result = vm.songs.filter(function(song) {
          return (
            (maingenre === "All" || song.maingenre === maingenre) &&
            (key === "All" || song.key === key)
          );
        });
      }
      if (order != null || order != "None") {
        if (order == "Views")
          return result.sort((a, b) => -(a.views - b.views));
        else if (order == "Downloads")
          return result.sort((a, b) => -(a.downloads - b.downloads));
        else if (order == "Likes")
          return result.sort((a, b) => -(a.likes - b.likes));
        else if (order == "Name Asc")
          return result.sort((a, b) => a.name.localeCompare(b.name));
        else if (order == "Name Desc")
          return result.sort((a, b) => -a.name.localeCompare(b.name));
      }

      return result;
    }
  },

  methods: {
    changeView(data) {
      //window.location.replace=data.item.type+'/'+data.item.id
      window.location.href = "http://localhost:8080/sheets/" + data.id;
    },

    eliminate(data) {
      this.$confirm("Are you sure?").then(() => {
        this.$http.delete("api/sheets/" + data.id).then(response => {
          if (response.status == 200)
            window.location.href = "http://localhost:8080/mysheets/";
        });
        
        
      });
    },
    edit(data) {
      window.location.href = "http://localhost:8080/editSong/" + data.id;
    }
  },

  components: {},

  mounted() {
    var id = JSON.parse(localStorage.getItem("activeUser")).id;
    this.$http.get("api/sheets/client/" + id).then(async response => {
      console.log(response.data);
      for (var item in response.data) {
        console.log(response.data[item]);
        if (response.data[item].image != null) {
          this.songs.push({
            id_client: response.data[item].clients_id,
            id: response.data[item].id,
            key: response.data[item].key,
            name: response.data[item].name,
            image:
              "http://localhost:8000/api/sheets/image/" +
              response.data[item].id,
            artist: response.data[item].username,
            maingenre: response.data[item].main_genre,
            views: response.data[item].views,
            likes: response.data[item].likes,
            downloads: response.data[item].downloads
          });
        } else {
          this.songs.push({
            id_client: response.data[item].clients_id,
            id: response.data[item].id,
            key: response.data[item].key,
            name: response.data[item].name,
            image: null,
            artist: response.data[item].username,
            maingenre: response.data[item].main_genre,
            views: response.data[item].views,
            likes: response.data[item].likes,
            downloads: response.data[item].downloads
          });
        }
      }
    });
  }
};
</script>
<style scoped>
.cardTitle {
  position: absolute;
  text-align: center;
  bottom: 0%;
  width: 100%;
  height: 30%;
  background-color: hsla(120, 3%, 20%, 0.281);
  font-size: 24px;
  color: white;
}
.filtersContainer {
  background-color: #38a694;
  margin: initial;
  width: 60%;
  border-radius: 10px;
  padding: 20px;
}
</style>
