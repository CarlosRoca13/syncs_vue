<template>
  <div class="main">
      <div style="padding-bottom:20px">
    <span class="display-3">Songs</span>
    </div>
    <v-container fluid class="filtersContainer">
      <span class="headline white--text">Filters <v-icon dark>filter_list</v-icon></span>
    <v-row>
      <v-col class="d-flex" cols="4" >
        <v-select
          dark
          :items="filtersSongsItems"
          v-model="currentOrderSongs"
          label="Order by"
        ></v-select>
      </v-col>
    </v-row>
    </v-container>

    <v-row>
      <div v-for="song in filterSongs" :key="song.id" style="margin-top:20px">
        <v-col>
          <v-card 
          class="mx-auto"
          max-width="344"
          outlined>
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
                <v-list-item-subtitle class="subtitle-2 white--text">{{song.artist}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              
            </a>
          </v-card>
        </v-col>
        
      </div>
    </v-row>


    <div style="padding-bottom:20px">
    <span class="display-3">Artists</span>
    </div>
    <v-container fluid class="filtersContainer">
      <span class="headline white--text">Filters <v-icon dark>filter_list</v-icon></span>
    <v-row>
      <v-col class="d-flex" cols="4" >
        <v-select
          dark
          :items="filtersAristsItems"
          v-model="currentOrderArtists"
          label="Order by"
        ></v-select>
      </v-col>
    </v-row>
    </v-container>

    <v-row>
      <div v-for="artist in filterArtists" :key="artist.id" style="margin-top:20px">
        <v-col>
          <v-card 
          class="mx-auto"
          max-width="344"
          outlined>
            <a @click="changeView(artist)">
              <v-img
                v-if="artist.avatar==null"
                src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
                width="250"
              ></v-img>
              <v-img v-else :src="artist.avatar" width="250" height="250"></v-img>

              <v-list-item three-line class="cardTitle">
                <v-list-item-content>
                <v-list-item-title class="headline mb-1 white--text">{{artist.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              
            </a>
          </v-card>
        </v-col>
        
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
    name: "SearchData",
    data() {
        return {
        
        artists: [],
        songs: [],

        filtersSongsItems: ["None", "Downloads", "Likes", "Views", "Name Asc", "Name Desc"],

        filtersAristsItems: ["None", "Name Asc", "Name Desc"],

        currentOrderSongs: "None",
        currentOrderArtists: "None",
        };
    },

    computed: {

      
      filterArtists: function(){
        var vm = this;
        var order = vm.currentOrderArtists;
        let result = vm.artists;
        
        if(order != null || order != 'None'){
            if(order == 'Name Asc')
                return result.sort((a, b) => a.name.localeCompare(b.name));

            else if(order == 'Name Desc')
                return result.sort((a, b) => -a.name.localeCompare(b.name));
        }

        return result;
          
          
        
      },

      filterSongs: function(){
        var vm = this;
        var order = vm.currentOrderSongs;
        let result = vm.songs;
        
        if(order != null || order != 'None'){
          if(order == 'Views')
            return result.sort((a, b) => -(a.views-b.views));
            
          else if(order == 'Downloads')
            return result.sort((a, b) => -(a.downloads-b.downloads));

          else if(order == 'Likes')
            return result.sort((a, b) => -(a.likes-b.likes));

          else if(order == 'Name Asc')
            return result.sort((a, b) => a.name.localeCompare(b.name));

          else if(order == 'Name Desc')
            return result.sort((a, b) => -a.name.localeCompare(b.name));
        }

        return result;
          
          
        
      },
    },
    
    methods: {

      changeView(data){
      //window.location.replace=data.item.type+'/'+data.item.id
      window.location.href = 'http://localhost:8080/'+data.type+'/'+data.id;
  
    },
    },
    
    components: {
      
    
    },
  
  mounted() {
        console.log(this.$route.query.q)
        var queryTerm = this.$route.query.q
        console.log("query",queryTerm)
        this.$http
          .get("/api/search/artist/"+queryTerm)
          .then(async response => {
            for (var item in response.data) {
              console.log(response.data[item]);
              if (response.data[item]) {
                
                if(response.data[item].avatar != null){
                    this.artists.push({id: response.data[item].clientid, name: response.data[item].client, avatar: "http://localhost:8000/api/clients/avatar/" + response.data[item].clientid, type: 'artistProfile'});
                }else{
                    this.artists.push({id: response.data[item].clientid, name: response.data[item].client, avatar: null, type: 'artistProfile'});
            }
              }
            }
            
          }).finally(() => (console.log('OK')));

        this.$http
          .get("/api/search/song/"+queryTerm)
          .then(async response => {  
            for (var item in response.data) {
              console.log("song:",response.data[item]);
              if (response.data[item]) {
                
                if(response.data[item].image != null){
                this.songs.push({id: response.data[item].sheetid, name: response.data[item].sheet, image: "http://localhost:8000/api/sheets/image/" + response.data[item].sheetid, artist: response.data[item].client, views: response.data[item].views, likes: response.data[item].likes, downloads: response.data[item].downloads, type: 'sheets'});
                }else{
                this.songs.push({id: response.data[item].sheetid, name: response.data[item].sheet, image: null, artist: response.data[item].client, views: response.data[item].views, likes: response.data[item].likes, downloads: response.data[item].downloads, type: 'sheets'});
                }
              }
            }
        }).finally(() => (console.log('OK')));
        this.$forceUpdate();
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
.filtersContainer{
  background-color: #38A694;
  margin: initial;
  width: 60%;
  border-radius: 10px;
  padding: 20px;
}
</style>
