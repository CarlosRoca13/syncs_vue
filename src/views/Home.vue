<template>
  <v-app>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
        <div>
        {{item.title}}
      </div>
      </v-carousel-item>
      
    </v-carousel>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          src:
            "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1390&q=80", 
            title: 'Artists', route: '/artists'
        },
        {
          src:
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
            title: 'Sheets', route: '/sheets'
        },
        {
          src:
            "https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
            title: 'Playlists', route: '/playlists'
        }
      ]
    };
  },
  methods: {
    peticionPost() {
      this.$http.delete("/clients/3").then(console.log("Done"));
    }
  }
};
</script>

<style>
</style>