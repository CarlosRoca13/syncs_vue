<template>
  <nav>
    <v-app-bar app dark style="background-color: #1F1F1F">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Syncs</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="searchbar">
        <SearchBar />
      </div>

      <v-spacer></v-spacer>
      <div v-if="userLogged==false">
        <v-btn text v-on:click="login()">Login</v-btn>
        <v-btn text v-on:click="register()" outlined>Sign Up</v-btn>
      </div>
      <div v-else>
        <v-menu offset-y class="profileMenu">
          <template v-slot:activator="{ on }">
            <div class="loggedUsername" v-on="on">
              <span class="loggedUsername">{{username}}</span>
              <v-avatar color="#bf4222" size="40">
                <span class="white--text headline">
                  <v-icon>account_circle</v-icon>
                </span>
              </v-avatar>
            </div>
          </template>

          <v-list class="profileMenuContent">
            <v-list-item v-for="item in menuItems" :key="item.title" @click="menuOptions(item.func)">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer dark app v-model="drawer" style="background-color: #38A694">
      <div class="logo">
        <a href="/">
          <v-img src="../assets/syncs.png" width="200"></v-img>
        </a>
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
import SearchBar from "./searchBar";
export default {
  components: {
    SearchBar
  },
  data() {
    return {
      username: null,
      userLogged: null,
      drawer: false,
      menuItems: [
        { title: "Edit Profile", icon: "create", func: "editProfile" },
        { title: "My Sheets", icon: "music_note", func: "mySheets" },
        { title: "Logout", icon: "exit_to_app", func: "logout" }
      ],
      items: [
        { title: "Artists", icon: "people_alt", route: "/artists" },
        { title: "Sheets", icon: "music_note", route: "/sheets" },
        { title: "Playlists", icon: "queue_music", route: "/playlists" }
      ]
    };
  },
  methods: {
    login() {
      this.$router.replace({ name: "Login" });
    },
    register() {
      this.$router.replace({ name: "Register" });
    },
    menuOptions: function(option){
      if(option == "editProfile"){
        this.$router.replace({ name: "Profile" });
        //console.log("Edit Profile");
      }else if(option == "mySheets"){
        console.log("My Sheets");
      }else if(option == "logout"){
        const loggedIn = localStorage.getItem('activeUser');

        if(loggedIn){
          localStorage.removeItem('activeUser')
          this.$router.replace({ name: "Home" });
          this.$router.go(this.$router.currentRoute)
        }
        console.log("Logout");
      }
    },
  },
  mounted() {
    let activeUser = localStorage.getItem("activeUser");
    const item = JSON.parse(activeUser);
    if (item == null) {
      this.userLogged = false;
    } else {
      this.username = item.username;
      this.userLogged = true;
      console.log(item);
    }
  }
};
</script>

<style>
.searchbar {
  margin-bottom: 24px;
  width: 300px;
}
.logo {
  margin-left: 20px;
  margin-top: 15px;
}
.menu-lateral {
  margin-top: 30px;
}
.profileMenu {
  padding-top: 10px;
}
.profileMenuContent {
  padding-right: 10px;
}
.loggedUsername {
  padding-right: 20px;
}
</style>
