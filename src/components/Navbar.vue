<template>
  <nav>
    <v-app-bar absolute dark app>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Syncs</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="searchbar">
        <v-text-field v-model="message4" label="Search..." solo clearable style="height:24px" background-color="grey darken-3"></v-text-field>
      </div>

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
export default {
  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style>
.searchbar {
  margin-bottom: 24px;
  width: 300px;
}
</style>