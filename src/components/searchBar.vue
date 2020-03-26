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

      
    >
     <template slot="item" slot-scope="data">
         {{ data.item.client }}
    </template>
    
    </v-autocomplete>
    
</template>

<script>

import axios from 'axios'
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
          this.loadEntries()
        }
      }
    }
  },
  
  created () {
    this.loadEntries()
  },

  methods: {
    async loadEntries () {
      axios.get('/api/search', {params:{name: this.queryTerm}})
            .then(response => this.entries= response.data);
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