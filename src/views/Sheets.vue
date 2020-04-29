<template>
  <div>
    <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="maingenre"
          :items="genres"
          label="Main genre"
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="key"
          :items="keys"
          label="Key"
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="filters"
          :item-text="i => i.name"
          :value="i => i.value"
          v-model="currentOrder"
          label="Order by"
        ></v-select>
      </v-col>
    </v-row>
    </v-container>
    <!-- <div class="my-2">
    <v-btn class="ma-2" small color="#38A694" dark>More views</v-btn>
    <v-btn class="ma-2" small color="#38A694" dark>More rating</v-btn>
    </div> -->
    <v-row>
      <div v-for="song in filterSongs" :key="song.id" class="songCard">
        <v-col>
          <v-card>
            <a @click="changeView(song)">
              <v-img
                v-if="song.image==null"
                src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
                width="250"
              ></v-img>
              <v-img v-else :src="song.image" width="250" height="250"></v-img>
            <div class="cardTitle text-center">
                <v-card-title>{{song.name}}</v-card-title>
                <v-card-text class='songArtistSubtitle'>{{song.artist}}</v-card-text>
            </div>
              
            </a>
          </v-card>
        </v-col>
        
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
    name: "Sheets",
    data() {
        return {
        currentOrder: 'value',
        maingenre: "All",
        key: "All",
        songs: [],

        genres: ["All", "Blues", "Classic", "Funk", "Grunge", "Jazz", "Metal", "Pop", "Punk", "Reggae", "Reggaeton", "Rock", "Salsa", "Techno"],
        keys: ["All", "A", "A#", "Ab", "Am", "A#m", "Abm", "B", "B#", "Bb", "Bm", "B#m", "Bbm", "C", "C#", "Cb", "Cm", "C#m", "Cbm", "D", "D#", "Db", "Dm", "D#m", "Dbm", "E", "E#", "Eb", "Em", "E#m", "Ebm", "E", "E#", "Eb", "Em", "E#m", "Ebm", "F", "F#", "Fb", "Fm", "F#m", "Fbm", "G", "G#", "Gb", "Gm", "G#m", "Gbm"],

        filters: [{name:"Likes", value:"likes"}, {name:"Views", value:"views"}],
        };
    },

    computed: {

      filterSongs: function(){
        var vm = this;
        var maingenre = vm.maingenre;
        var key = vm.key;
        
        if(maingenre === 'All' && key === 'All') {
          return vm.songs;
        }else{
          return vm.songs.filter(function(song) {
            return (maingenre === 'All' || song.maingenre === maingenre) && (key === 'All' || song.key === key);	 
          });
        }
      },
    },
    
    methods: {
  
      changeView(data){
      //window.location.replace=data.item.type+'/'+data.item.id
      window.location.href = 'http://localhost:8080/sheets/'+data.id;
  
    },
    },
    
    components: {
    
    },

  mounted() {
    this.$http.get("/api/sheets/").then(async response => {
      console.log(response.data);
        for(var item in response.data){
          for(var i in response.data[item]){
            let res = await this.$http.get("/api/clientsong/"+response.data[item][i].id)
            console.log(response.data[item][i])
            if(response.data[item][i].image != null){
              this.songs.push({id_client: response.data[item][i].clients_id, id: response.data[item][i].id, key: response.data[item][i].key, name: response.data[item][i].name, image: "http://localhost:8000/api/sheets/image/" + response.data[item][i].id, artist: res.data[0].client, maingenre: response.data[item][i].main_genre, views: response.data[item][i].views});
            }else{
              this.songs.push({id_client: response.data[item][i].clients_id, id: response.data[item][i].id, key: response.data[item][i].key, name: response.data[item][i].name, image: null, artist: res.data[0].client, maingenre: response.data[item][i].main_genre, views: response.data[item][i].views});
            }
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
.songArtistSubtitle{
  font-size: 18px;
  color: blue;
}
</style>
