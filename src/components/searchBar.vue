<template>
    <div id="search-bar" class="search-bar">
        <v-text-field
          v-model="message4"
          label="Search..."
          solo
          clearable
          style="height:24px"
          background-color="grey darken-3"
          append-icon="search"
        ></v-text-field>
        <div v-for="elem in query" v-bind:key="elem.id" class="single-elem">
            <h2>{{elem.id | to-uppercase}}</h2>
            <sheet>{{elem.name| snippet}}</sheet>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data(){
        return{
            query: [],
            search: ''
        }
    },
    methods:{

    },
    created(){
        this.$http.get('/search').then(function(data){
            this.query = data.body.slice(0,10);
        })
    },
    computed:{
        filteredData: function(){
            return this.query.filter((elem) => {
                return elem.title.match(this.search);
            });
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