<template>
    <div id="search-bar" class="search-bar">
        <v-text-field
          v-model="search"
          label="Search..."
          solo
          clearable
          style="height:24px"
          background-color="grey darken-3"
          append-icon="search"
        ></v-text-field>
        <select >
            <option>
                <div v-for="item in filteredData" v-bind:key="item.id" class="single-item">
                <h2>{{item.name | to-uppercase}}</h2>
                <sheet>{{item.name | snippet}}</sheet>
                </div>
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data(){
        return{
            items: [],
            search: ''
        }
    },
    methods:{
    
    },
    created(){
        this.$http.get('/search').then(function(data){
            this.items = data.body.slice(0,10);
        })
    },
    computed:{
        filteredData: function(){
            return this.items.filter((item) => {
                return item.name.match(this.search);
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