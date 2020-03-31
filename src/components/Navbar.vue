<template>
  <nav>
    <v-app-bar app dark style="background-color: #04151f">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Syncs</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="searchbar">
        <SearchBar/>
      </div>

      <v-spacer></v-spacer>
      <v-btn text v-on:click="login()">Login</v-btn>

      <v-btn text v-on:click="register()" outlined>Sign Up</v-btn>
    </v-app-bar>

    <v-navigation-drawer dark app v-model="drawer" style="background-color: #183a37">
      <div class="logo">
      <a href="/"><v-img src="../assets/syncs.png" width="200"></v-img></a>
      </div>

      <v-list class="menu-lateral">
        <v-list-item v-for="item in items" :key="item.title" :href="item.route">
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
        { title: "Artists", icon: "people_alt", route:"/artists"},
        { title: "Sheets", icon: "music_note", route:"/sheets" },
        { title: "Playlists", icon: "queue_music", route:"/playlists" }
      ]
    };
  },
  methods:{
    login(){
      this.$router.replace({ name: "Login" });
    },
    register(){
      this.$router.replace({ name: "Register" });
    }
  }
};
</script>

<style>
.searchbar {
  margin-bottom: 24px;
  width: 300px;
}
.logo{
  margin-left: 20px;
  margin-top: 15px;
}
.menu-lateral{
  margin-top: 30px;
}

</style>
