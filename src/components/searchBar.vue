<template>
  <div>
    <v-autocomplete
      v-model="queryTerm"
      :items="names"
      :search-input.sync="search"
      placeholder="Search..."
      solo
      :loading="isLoading"
      item-value="id"
      clearable
      style="height:24px"
      background-color="grey darken-3"
      no-filter
      @keyup="loadEntries"
      return-object
    >
      <div slot="item" slot-scope="data" v-if="queryTerm" @click="changeView(data)">{{ data.item }}
        <span class="artistSong" v-if="artists[getArtist(data)]!=null">by {{artists[getArtist(data)]}}</span>
      </div>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTag: "",
      entries: [],
      names: [],
      artists: [],
      queryTerm: "",
      isLoading: false,
    };
  },
  computed: {
    search: {
      get() {
        return this.queryTerm;
      },

      set(searchInput) {
        if (this.queryTerm !== searchInput) {
          this.queryTerm = searchInput;
        }
      }
    }
  },

  methods: {
    async loadEntries() {
      if (this.isLoading) return
      this.entries = [];
      this.names = [];
      this.artists = [];

      if (this.queryTerm) {
        this.isLoading = true
        this.$http
          .get("/api/search", { params: { name: this.queryTerm } })
          .then(async response => {
            this.names.push({ header: "Artists" });
            for (let item in response.data) {
              if (response.data[item].client) {
                this.entries.push({ name: response.data[item].client, id: response.data[item].clientid, type: 'clients'});
                this.names.push(response.data[0].client);
              }
            }
            this.names.push({ header: "Songs" });
            for (let item in response.data) {
              if (response.data[item].sheet) {
                let res = await this.$http.get("/api/clientsong/"+response.data[item].sheetid)
                
                this.entries.push({ name: response.data[item].sheet, id: response.data[item].sheetid, type: 'sheets', artist: res.data[0].client});
                this.names.push(response.data[0].sheet);
                this.artists.push(res.data[0].client);
                
              }
            }
            this.names.push({ header: "Playlists" });
            for (let item in response.data) {
              if (response.data[item].playlist) {
                let res = await this.$http.get("/api/clientplaylist/"+response.data[item].playlistid)

                this.entries.push({ name: response.data[item].playlist, id: response.data[item].playlistid, type: 'playlists', artist: res.data[0].client});
                this.names.push(response.data[0].playlist);
                this.artists.push(res.data[0].client);

              }
            }
          }).finally(() => (this.isLoading = false));
      }
    },


  changeView(data){
    //window.location.replace=data.item.type+'/'+data.item.id
    var type = this.entries.find(x => x.name === data.item).type;
    var id = this.entries.find(x => x.name === data.item).id;
    window.location.href = 'http://localhost:8080/'+type+'/'+id;
  
  },

  

  getArtist(data){
    var artist = this.entries.findIndex(x => x.name === data.item);
    return artist;
  },

  }

 
}
</script>

<style>
.search-bar {
  margin-bottom: 25px;
  width: 300px;
}
.artistSong{
  font-size: 12px;
  font-style: italic;
  color: grey;
}
</style>