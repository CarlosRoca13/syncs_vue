<template>
  <div class="main">
    <div style="padding-bottom:20px">
    <span class="display-3">Artists</span>
    </div>
    <v-container fluid class="filtersContainer">
      <span class="headline white--text">Filters <v-icon dark>filter_list</v-icon></span>
    <v-row>
      <v-col class="d-flex" cols="4" >
        <v-select
          dark
          :items="filters"
          v-model="currentOrder"
          label="Order by"
        ></v-select>
      </v-col>
    </v-row>
    </v-container>

    <v-row>
      <div v-for="artist in filterArtists" :key="artist.id" style="margin-top:20px">
        <v-col>
          <v-card 
          class="mx-auto"
          max-width="344"
          outlined>
            <a @click="changeView(artist)">
              <v-img
                v-if="artist.image==null"
                src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
                width="250"
              ></v-img>
              <v-img v-else :src="artist.image" width="250" height="250"></v-img>

              <v-list-item three-line class="cardTitle">
                <v-list-item-content>
                <v-list-item-title class="headline mb-1 white--text">{{artist.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              
            </a>
          </v-card>
        </v-col>
        
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
    name: "Artists",
    data() {
        return {
        currentOrder: "None",
        artists: [],

        filters: ["None", "Name Asc", "Name Desc"],
        };
    },

    computed: {

      filterArtists: function(){
        var vm = this;
        var order = vm.currentOrder;
        let result = vm.artists;
        
        if(order != null || order != 'None'){
            if(order == 'Name Asc')
                return result.sort((a, b) => a.name.localeCompare(b.name));

            else if(order == 'Name Desc')
                return result.sort((a, b) => -a.name.localeCompare(b.name));
        }

        return result;
          
          
        
      },
    },
    
    methods: {
  
      changeView(data){
      //window.location.replace=data.item.type+'/'+data.item.id
      window.location.href = 'http://localhost:8080/artistProfile/'+data.id;
  
    },
    },
    
    components: {
    
    },

  mounted() {
    this.$http.get("/api/artists/").then(async response => {
      console.log(response.data);
        for(var item in response.data){
          console.log(response.data[item])
            if(response.data[item].avatar != null){
              this.artists.push({id: response.data[item].clients_id, name: response.data[item].username, image: "http://localhost:8000/api/clients/avatar/" + response.data[item].clients_id});
            }else{
              this.artists.push({id: response.data[item].clients_id, name: response.data[item].username, image: null});
            }
        }
    });
  }
};
</script>
<style scoped>
.cardTitle {
  position: absolute;
  text-align: center;
  bottom: 0%;
  width: 100%;
  height: 30%;
  background-color: hsla(120, 3%, 20%, 0.281);
  font-size: 24px;
  color: white;
}
.filtersContainer{
  background-color: #38A694;
  margin: initial;
  width: 60%;
  border-radius: 10px;
  padding: 20px;
}
</style>
