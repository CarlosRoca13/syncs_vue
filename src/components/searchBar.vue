<template>
  <div>
    <v-autocomplete
      v-model="queryTerm"
      :items="entries"
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
      <div slot="item" slot-scope="data" v-if="queryTerm" @click="changeView(data)">{{ data.item.name }} by {{data.item.artist}}</div>
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
        this.$http
          .get("/api/search", { params: { name: this.queryTerm } })
          .then(async response => {
            this.entries.push({ header: "Artists" });
            for (let item in response.data) {
              if (response.data[item].client) {
                this.entries.push({ name: response.data[item].client, id: response.data[item].clientid, type: 'clients'});
              }
            }
            this.entries.push({ header: "Songs" });
            for (let item in response.data) {
              if (response.data[item].sheet) {
                let res = await this.$http.get("/api/clientsong/"+response.data[item].sheetid)
                
                this.entries.push({ name: response.data[item].sheet, id: response.data[item].sheetid, type: 'sheets', artist: res.data[0].client});

                
              }
            }
            this.entries.push({ header: "Playlists" });
            for (let item in response.data) {
              if (response.data[item].playlist) {
                let res = await this.$http.get("/api/clientplaylist/"+response.data[item].playlistid)

                this.entries.push({ name: response.data[item].playlist, id: response.data[item].playlistid, type: 'playlists', artist: res.data[0].client});
              }
            }
          }).finally(() => (this.isLoading = false));
      }
    },


  changeView(data){
    //window.location.replace=data.item.type+'/'+data.item.id
    window.location.href = 'http://localhost:8080/'+data.item.type+'/'+data.item.id;
  
  }
  }
}
</script>

<style>
.search-bar {
  margin-bottom: 25px;
  width: 300px;
}
</style>