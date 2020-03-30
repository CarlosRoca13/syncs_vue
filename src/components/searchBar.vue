<template>
  <v-autocomplete class="search-bar"
      v-model="newTag"
      :items="entries"
      :search-input.sync="search"
      placeholder="Search..."
      solo
      clearable
      style="height:24px"
      background-color="grey darken-3"
      append-icon="search"
      no-filter
      @keyup="loadEntries"
    >

    <div slot="item" slot-scope="data" v-if="queryTerm">
        {{ data.item.name }}
    </div>
    
    </v-autocomplete>
    
</template>

<script>

export default {
  data () {
    return {
        newTag: '',
        entries: [],
        queryTerm: '',
        
    }
  },
  computed: {
    search: {
      get () {
        return this.queryTerm
      },
      
      set (searchInput) {
        if (this.queryTerm !== searchInput) {
          this.queryTerm = searchInput
        }
      }
    }
  },

  methods: {
    async loadEntries () {
      this.entries = []
      if(this.queryTerm){
        this.$http.get('/api/search', {params:{name: this.queryTerm}})
            .then(response => {
              this.entries.push({header: 'Artists'})
              for(let item in response.data){
                if(response.data[item].client != 'NO RESULTS'){
                  this.entries.push({name: response.data[item].client})
                }
              }
              this.entries.push({header: 'Songs'})
              for(let item in response.data){
                if(response.data[item].sheet != 'NO RESULTS'){
                  this.entries.push({name: response.data[item].sheet})
                }
              }
              this.entries.push({header: 'Playlists'})
              for(let item in response.data){
                if(response.data[item].playlist != 'NO RESULTS'){
                  this.entries.push({name: response.data[item].playlist})
                }
              }
            });
            }
      
    }
  }
}
</script>

<style>
.search-bar {
  margin-bottom: 24px;
  width: 300px;
}
</style>