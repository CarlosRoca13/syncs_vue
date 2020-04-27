<template>
  <div>
    <v-select
        v-model="maingenre"
        :items="genres"
        label="Main genre"
      ></v-select>
    <v-row>
      <div v-for="song in songs" :key="song.id" class="songCard">
        <v-col v-if="maingenre==null || maingenre=='All'">
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
                <v-card-subtitle>{{song.artist}}</v-card-subtitle>
            </div>
              
            </a>
          </v-card>
        </v-col>
        <v-col v-if="maingenre!=null && song.maingenre==maingenre">
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
                <v-card-subtitle>{{song.artist}}</v-card-subtitle>
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
        maingenre: null,
        songs: [],
        genres: ["All","Rock", "Punk", "Blues", "Funk", "Pop", "Techno", "Classic", "Jazz", "Metal", "Death Metal", "Thrash Metal", "Nu Metal", "Power Metal", "Reggae", "Grunge"],
        };
    },
    methods: {
    changeView(data){
    //window.location.replace=data.item.type+'/'+data.item.id
    window.location.href = 'http://localhost:8080/sheets/'+data.id;
  
    }
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
              this.songs.push({id_client: response.data[item][i].clients_id, id: response.data[item][i].id, name: response.data[item][i].name, image: "http://localhost:8000/api/sheets/image/" + response.data[item][i].id, artist: res.data[0].client, maingenre: response.data[item][i].main_genre});
            }else{
              this.songs.push({id_client: response.data[item][i].clients_id, id: response.data[item][i].id, name: response.data[item][i].name, image: null, artist: res.data[0].client, maingenre: response.data[item][i].main_genre});
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
</style>
