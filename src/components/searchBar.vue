<template>
  <div>
    
    <v-text-field  v-on:keyup.enter="search()" label="Search..." clearable
    style="height:24px" v-model="queryTerm" background-color="grey darken-3">
    </v-text-field>
    
      <!-- <div slot="item" slot-scope="data" v-if="queryTerm" @click="changeView(data.item)">{{ data.item.name }}
        <span class="artistSong" v-if="data.item.artist !=null">by {{data.item.artist}}</span>
      </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryTerm: "",
    };
  },
  watch: {
      '$route.query.q'() {
            this.search();
        }
  },

  methods: {
    /* async loadEntries() {
      if (this.isLoading) 
        return

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



      
      this.isLoading = false;

      }
      
    }, */


    search(){
      this.$forceUpdate();
      this.$router.go({ name: "SearchData", query: {q: this.queryTerm}});
      //this.$emit("inputData", this.queryTerm);
      //this.queryTerm = "";

    },

  }

 
}

</script>

<style>
.search-bar {
  margin-bottom: 25px;
  width: 300px;
}
</style>