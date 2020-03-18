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
        <div v-for="item in filteredData" v-bind:key="item.id" class="single-item">
            <h2>{{item.id | to-uppercase}}</h2>
            <sheet>{{item.name | snippet}}</sheet>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data(){
        return{
            query: [],
            message4: ''
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
            return this.query.filter((item) => {
                return item.name.match(this.message4);
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