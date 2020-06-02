<template>
  <div>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
        <div class="carousel-text text-center">
          <div style="padding-top: 25px">
            <a :href="item.route" style="color: inherit;
  text-decoration: inherit;">{{item.title}}</a>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
    <v-row style="background-color:#1F1F1F;" class="justify-center">
      <div class="daySong">
        <v-card style="background-color:transparent;" class="mx-auto" outlined>
          <a @click="changeViewSheet(randomSong)">
            <v-img
              v-if="randomSong.image==null"
              src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
              width="600px"
              height="600px"
            ></v-img>
            <v-img v-else :src="randomSong.image" width="600px" height="600px"></v-img>
            <v-card-title style="color:#38A694;">Song of the day!</v-card-title>
            <v-list-item three-line class="cardTitle">
              <v-list-item-content>
                <v-list-item-title class="headline white--text">{{randomSong.name}}</v-list-item-title>
                <v-list-item-subtitle
                  class="subtitle-2 white--text"
                  style="padding-bottom:50px"
                >{{randomSong.artist}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-card>
      </div>
      <div class="daySong">
        <v-card style="background-color:transparent;" class="mx-auto" outlined>
          <a @click="changeViewSheet(mostLikedSong)">
            <v-img
              v-if="mostLikedSong.image==null"
              src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
              width="600px"
              height="600px"
            ></v-img>
            <v-img v-else :src="mostLikedSong.image" width="600px" height="600px"></v-img>
            <v-card-title style="color:#38A694;">Most liked song!</v-card-title>
            <v-list-item three-line class="cardTitle">
              <v-list-item-content>
                <v-list-item-title class="headline white--text">{{mostLikedSong.name}}</v-list-item-title>
                <v-list-item-subtitle
                  class="subtitle-2 white--text"
                  style="padding-bottom:50px"
                >{{mostLikedSong.artist}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-card>
      </div>
      <div class="daySong">
        <v-card style="background-color:transparent;" class="mx-auto" outlined>
          <a @click="changeViewSheet(mostViewSong)">
            <v-img
              v-if="mostViewSong.image==null"
              src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
              width="600px"
              height="600px"
            ></v-img>
            <v-img v-else :src="mostViewSong.image" width="600px" height="600px"></v-img>
            <v-card-title style="color:#38A694;">Most viewed song!</v-card-title>
            <v-list-item three-line class="cardTitle">
              <v-list-item-content>
                <v-list-item-title class="headline white--text">{{mostViewSong.name}}</v-list-item-title>
                <v-list-item-subtitle
                  class="subtitle-2 white--text"
                  style="padding-bottom:50px"
                >{{mostViewSong.artist}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-card>
      </div>
    </v-row>
    <v-row style="background-color:#1F1F1F;" class="justify-center">
      <div class="dayArtist">
        <v-card style="background-color:transparent;" outlined>
          <a @click="changeViewArtist(randomArtist)">
            <v-img
              v-if="randomArtist.image==null"
              src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
              width="600px"
              height="600px"
            ></v-img>
            <v-img v-else :src="randomArtist.image" width="600px" height="600px"></v-img>

            <v-card-title style="color:#38A694;">Artist of the day!</v-card-title>
            <v-list-item three-line class="cardTitle">
              <v-list-item-content>
                <v-list-item-title class="headline mb-1 white--text">{{randomArtist.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-card>
      </div>
      <div class="dayArtist">
        <v-card style="background-color:transparent;" outlined>
          <a @click="changeViewArtist(mostFollowedArtist)">
            <v-img
              v-if="mostFollowedArtist.image==null"
              src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
              width="600px"
              height="600px"
            ></v-img>
            <v-img v-else :src="mostFollowedArtist.image" width="600px" height="600px"></v-img>

            <v-card-title style="color:#38A694;">Most followed artist!</v-card-title>
            <v-list-item three-line class="cardTitle">
              <v-list-item-content>
                <v-list-item-title class="headline mb-1 white--text">{{mostFollowedArtist.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-card>
      </div>
    </v-row>
  </div>
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
          title: "Artists",
          route: "/artists"
        },
        {
          src:
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          title: "Sheets",
          route: "/sheets"
        },
        {
          src:
            "https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
          title: "Playlists",
          route: "/playlists"
        }
      ],
      songs: [],
      artists: [],
      randomSong: { name: null, image: null, artist: null },
      mostViewSong: { name: null, image: null, artist: null },
      mostLikedSong: { name: null, image: null, artist: null },
      randomArtist: { name: null, image: null },
      mostFollowedArtist: { name: null, image: null }
    };
  },
  methods: {
    peticionPost() {
      this.$http.delete("/clients/3").then(console.log("Done"));
    },
    changeViewSheet(data) {
      window.location.href = "http://localhost:8080/sheets/" + data.id;
    },
    changeViewArtist(data) {
      window.location.href = "http://localhost:8080/artistProfile/" + data.id;
    }
  },
  async mounted() {
    await this.$http.get("/api/sheets/").then(response => {
      var views = 0;
      var likes = 0;
      for (var item in response.data) {
        if (response.data[item].image != null) {
          this.songs.push({
            id_client: response.data[item].clients_id,
            id: response.data[item].id,
            key: response.data[item].key,
            name: response.data[item].name,
            image:
              "http://localhost:8000/api/sheets/image/" +
              response.data[item].id,
            artist: response.data[item].username,
            maingenre: response.data[item].main_genre,
            views: response.data[item].views,
            likes: response.data[item].likes,
            downloads: response.data[item].downloads
          });
        } else {
          this.songs.push({
            id_client: response.data[item].clients_id,
            id: response.data[item].id,
            key: response.data[item].key,
            name: response.data[item].name,
            image: null,
            artist: response.data[item].username,
            maingenre: response.data[item].main_genre,
            views: response.data[item].views,
            likes: response.data[item].likes,
            downloads: response.data[item].downloads
          });
        }
        if (response.data[item].views >= views) {
          this.mostViewSong = this.songs[item];
          views = response.data[item].views;
        }
        if (response.data[item].likes >= likes) {
          this.mostLikedSong = this.songs[item];
          likes = response.data[item].likes;
        }
      }
      this.randomSong = this.songs[0];
    });
    this.$http.get("/api/artists/").then(async response => {
      console.log(response);
      var followers = 0;
      for (var item in response.data) {
        if (response.data[item].avatar != null) {
          this.artists.push({
            id: response.data[item].clients_id,
            name: response.data[item].username,
            image:
              "http://localhost:8000/api/clients/avatar/" +
              response.data[item].clients_id,
              followers: response.data[item].followers,
          });
        } else {
          this.artists.push({
            id: response.data[item].clients_id,
            name: response.data[item].username,
            image: null,
            followers: response.data[item].followers,
          });
        }
        if(response.data[item].followers >= followers){
          this.mostFollowedArtist = this.artists[item];
          followers = response.data[item].followers;
        }
      }
      this.randomArtist = this.artists[0];
    });
  }
};
</script>

<style scoped>
.carousel-text {
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 20%;
  background-color: hsla(120, 3%, 20%, 0.281);
  font-size: 36px;
  color: white;
}
.dayArtist {
  width: 30%;
  padding-bottom: 65px;
  padding-top: 2px;
}
.daySong {
  width: 30%;
  padding-top: 2px;
}
</style>