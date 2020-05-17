<template>
  <nav>
    <v-app-bar app dark style="background-color: #1F1F1F">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>

      <a class="titleLink" href="/"><v-toolbar-title>Syncs</v-toolbar-title></a>

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
              <v-avatar color="transparent" size="40">
                  <img
        :src="avatar"
      >
              </v-avatar>
            </div>
            
          </template>
          <v-list class="profileMenuContent">
            <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              @click="menuOptions(item.func)"
            >
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
        <v-list-group
        color="#1F1F1F"
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator >
          <v-list-item-content >
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          @click="drawerOptions(subItem.route)"
        >
          
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
            <v-list-item-action>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-action>
        </v-list-item>
      </v-list-group>
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
      avatar: null,
      username: null,
      userLogged: null,
      drawer: false,
      menuItems: [
        { title: "My Profile", icon: "create", func: "editProfile" },
        { title: "Logout", icon: "exit_to_app", func: "logout" }
      ],
      items: [
        { title: "Artists", icon: "people_alt",
            items:[{title:"Main", icon: "graphic_eq", route:"artists"}, {title:"My Artists", icon: "people_outline", route:"artists"}] },
        { title: "Sheets", icon: "music_note", 
            items:[{title:"Main", icon: "graphic_eq", route:"sheets"}, {title:"My Sheets", icon: "library_music", route:"mysheets"}, {title:"Create Song", icon: "add", route:"createsong"}]},
        { title: "Playlists", icon: "queue_music",
            items:[{title:"Favorites", icon: "favorite", route:"favorites"}] },
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
    drawerOptions: function(option){
      window.location.href = "http://localhost:8080/" + option;
    },
    menuOptions: function(option) {
      if (option == "editProfile") {
        this.$router.replace({ name: "Profile" });
        //console.log("Edit Profile");
      }else if (option == "logout") {
        const loggedIn = localStorage.getItem("activeUser");

        if (loggedIn) {
          localStorage.removeItem("activeUser");
          this.$router.replace({ name: "Home" });
          this.$router.go(this.$router.currentRoute);
        }
        console.log("Logout");
      }
    }
  },
  mounted() {
    let activeUser = localStorage.getItem("activeUser");
    const item = JSON.parse(activeUser);
    if (item == null) {
      this.userLogged = false;
    } else {
      this.avatar = "http://localhost:8000/api/clients/avatar/" + item.id,
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

.titleLink:link {
  text-decoration: none;
  color: white;
}

.titleLink:visited {
  text-decoration: none;
  color: white;
}

.titleLink:hover {
  color: whitesmoke;
}
</style>
