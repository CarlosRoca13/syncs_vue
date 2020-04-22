<template>
  <div>
    <v-autocomplete
      v-model="queryTerm"
      :items="entries"
      :item-text="i => i.name"
      :search-input.sync="search"
      placeholder="Search..."
      solo
      :loading="isLoading"
      :item-value="i => i.id"
      clearable
      style="height:24px"
      background-color="grey darken-3"
      no-filter
      @keyup="loadEntries"
      return-object
    >
      <div slot="item" slot-scope="data" v-if="queryTerm" @click="changeView(data.item)">{{ data.item.name }}
        <span class="artistSong" v-if="data.item.artist !=null">by {{data.item.artist}}</span>
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

      if (this.queryTerm) {
        this.isLoading = true
        await this.$http
          .get("/api/search/artist/"+this.queryTerm)
          .then(async response => {
            this.entries.push({ header: "Artists" });
            for (let item in response.data) {
              if (response.data[item].client) {
                console.log(response.data);
                this.entries.push({ name: response.data[item].client, id: response.data[item].clientid, type: 'clients'});
              }
            }
            
          }).finally(() => (this.isLoading = false));

        await this.$http
          .get("/api/search/song/"+this.queryTerm)
          .then(async response => {  
          this.entries.push({ header: "Songs" });
            for (let item in response.data) {
              if (response.data[item].sheet) {
                console.log("song:",response.data[item].sheet);
                let res = await this.$http.get("/api/clientsong/"+response.data[item].sheetid)
                
                this.entries.push({ name: response.data[item].sheet, id: response.data[item].sheetid, type: 'sheets', artist: res.data[0].client});
                
              }
            }
        }).finally(() => (this.isLoading = false));


        await this.$http
        .get("/api/search/playlist/"+this.queryTerm)
        .then(async response => {  
            this.entries.push({ header: "Playlists" });
            for (let item in response.data) {
              if (response.data[item].playlist) {
                console.log(response.data);
                let res = await this.$http.get("/api/clientplaylist/"+response.data[item].playlistid)

                this.entries.push({ name: response.data[item].playlist, id: response.data[item].playlistid, type: 'playlists', artist: res.data[0].client});

              }
            }
          }).finally(() => (this.isLoading = false));

      }
      
    },


  changeView(data){
    //window.location.replace=data.item.type+'/'+data.item.id
    window.location.href = 'http://localhost:8080/'+data.type+'/'+data.id;
  
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