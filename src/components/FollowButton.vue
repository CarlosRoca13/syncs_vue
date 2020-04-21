<template>
    <v-btn  @click="follow">
        {{nombre}}
    </v-btn>
</template>

<script>
    export default {
        data(){
          return{
              estado: false,
              nombre: 'Seguir',
              seguidores: []
          }
        },
        props: {
            user_id: Number,
            follower_id: Number,
        },
        methods: {
            follow(){
                if (this.estado){
                    this.$http.delete('/api/follows/'+this.user_id + '/' + this.follower_id)
                    this.estado=false
                    this.nombre='Seguir'

                }
                else{
                    this.$http.post('/api/follows',{
                        user_id: this.user_id,
                        follower_id: this.follower_id
                    })
                    this.nombre = 'Siguiendo'
                    this.estado=true
                }


            },
            checkFollow(){
                    this.estado = this.seguidores.includes(this.follower_id)
                    if (this.estado === true ){
                        this.nombre = 'Siguiendo'
                    }
                    else{
                        this.nombre='Seguir'
                    }
            }

        }
        ,
        mounted() {
            this.$http.get('/api/follows/' + this.user_id )
                .then((result) => {
                    this.seguidores = result.data
                    this.checkFollow()
                });

        }
    }
</script>

<style scoped>

</style>
