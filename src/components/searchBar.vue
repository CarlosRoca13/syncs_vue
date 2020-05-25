<template>
  <div>
    
    <v-text-field  v-on:keyup.enter="search()" label="Search..." clearable solo append-icon="search"
    style="height:24px" v-model="queryTerm" background-color="grey darken-3">
    </v-text-field>
    
      <!-- <div slot="item" slot-scope="data" v-if="queryTerm" @click="changeView(data.item)">{{ data.item.name }}
        <span class="artistSong" v-if="data.item.artist !=null">by {{data.item.artist}}</span>
      </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryTerm: "",
    };
  },

  methods: {

    search(){
      if(window.location.href.includes('/search')){ //cambiar por ajax
        this.$router.push({ name: "SearchData", query: {q: this.queryTerm}});
        this.$router.go({ name: "SearchData", query: {q: this.queryTerm}});
      }else{
        this.$router.push({ name: "SearchData", query: {q: this.queryTerm}});
      }
      
      //this.$emit("inputData", this.queryTerm);
      //this.queryTerm = "";

    },

  }

 
}

</script>

<style>
.search-bar {
  margin-bottom: 25px;
  width: 300px;
}
</style>