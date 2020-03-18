<template>
  <nav>
    <v-app-bar absolute dark app>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Syncs</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="searchbar">
        <SearchBar/>
      </div>

      <v-spacer></v-spacer>
      <v-btn text>Login</v-btn>

      <v-btn outlined>Sign Up</v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" dark>
      <div class="logo">
      <a href="/"><v-img src="../assets/syncs.png" width="200"></v-img></a>
      </div>

      <v-list class="menu-lateral">
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import SearchBar from './searchBar'
export default {
   components: {
    SearchBar
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: "Artists", icon: "people_alt" },
        { title: "Sheets", icon: "music_note" },
        { title: "Playlists", icon: "queue_music" }
      ]
    };
  },
};
</script>

<style>
/* .searchbar {
  margin-bottom: 24px;
  width: 300px;
} */
.logo{
  margin-left: 20px;
  margin-top: 15px;
}
.menu-lateral{
  margin-top: 30px;
}
</style>
