<template>
    <div id="search-bar" class="search-bar">
        <form @keyup="showData()">
            <v-text-field v-model.lazy="keywords" 
            v-debounce="300"
            placeholder="Search..."
            solo
            clearable
            style="height:24px"
            background-color="grey darken-3"
            append-icon="search"
            />

            <table>
            <tr>
                <table class="show-data"  v-if="results.length > 0">
                    <tr v-for="result in results" :key="result.id">
                    <td>Artist: {{result.client}}</td>
                
                    <td>Sheet: {{result.sheet}}</td>

                    <td>Playlist: {{result.playlist}}</td>
                    </tr>
                </table>
            </tr>
        </table>
        </form>



        
        

    </div>
        
    
</template>

<script>
import axios from 'axios'
export default {
    name: 'SearchBar',
    data(){
        return{
            results: [],
            keywords: ''
        }
        
        /* return{
            items: [],
            search: ''
        } */
    },

    methods:{

        showData() {
            axios.get('/api/search', {params:{name: this.keywords}})
                .then(response => this.results = response.data);
        
        },
    
    },
    created() {
       
    },
    computed: {
         
    }
    /* created(){
        this.$http.get('search').then(function(data){
            this.items = data.body.slice(0,10);
        })
    },
    computed:{
        filteredData: function(){
            return this.items.filter((item) => {
                return item.name.match(this.search);
            });
        }
    } */
}
</script>

<style>
.search-bar {
  margin-bottom: 24px;
  width: 300px;
}
.show-data{
    margin-bottom: 24px;
    width: 300px;
}
</style>