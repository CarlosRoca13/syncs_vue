<template>
    <div id="search-bar">
        <input type="text" v-model="search" placeholder="Introduce un término"/>
        <div v-for="elem in query" v-bind:key="elem.id" class="single-elem">
            <h2>{{elem.title | to-uppercase}}</h2>
            <sheet>{{elem.body | snippet}}</sheet>
        </div>
    </div>
</template>

<script>
export default {
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