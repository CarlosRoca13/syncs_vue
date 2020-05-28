  
<template>
    <v-btn  @click="fav">
        {{nombre}}
    </v-btn>
</template>

<script>
    export default {
        data(){
          return{
              estado: false,
              nombre: 'Add'
         
          }
        },
        props: {
            sheet_id: Number,
            client_id: Number,
        },
        methods: {
            fav(){
                if (this.estado){
                    this.$http.delete('/api/favorite/' + this.sheet_id '/' + this.client_id)
                    this.estado=false
                    this.nombre='Add'
                }
                else{
                    this.$http.post('/api/favorite/' + this.sheet_id '/' + this.client_id)
                    this.nombre = 'Delete'
                    this.estado=true
                }
            }
           
        }
        ,
        mounted() {
            this.$http.get('/api/favorite/' + this.sheet_id '/' + this.client_id )
                .then((result) => {
                    this.estado = result.data
                    if (this.estado === true ){
                        this.nombre = 'Delete'
                    }
                    else{
                        this.nombre='Add'
                    }
                });
        }
    }
</script>

<style scoped>
</style>
