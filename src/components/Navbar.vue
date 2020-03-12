<template>
  <nav>
    <v-app-bar absolute dark app>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Syncs</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <SearchBar/>
      

      <v-spacer></v-spacer>
      <v-btn text>Login</v-btn>

      <v-btn outlined>Sign Up</v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" dark>
      <p>test</p>
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
      drawer: false
    };
  }
};
</script>
