<template>
  <div class="main">
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="9" md="6">
            <v-row style="padding-left:10px">
              <div class="sheetTitle">{{info.name}}</div>
            </v-row>
            <v-row style="padding-left:10px">
              <div class="sheetArtist">{{info.username}}</div>
            </v-row>
            <v-row>
              <v-col cols="3">
                {{info.views}}
                <v-icon class="interactionIcons">visibility</v-icon>
              </v-col>
              <v-col cols="3">
                {{info.likes}}
                <v-btn icon @click="likeButton">
                  <v-icon
                    v-if="like==false"
                    style="padding-bottom:10px"
                    class="interactionIcons"
                  >thumb_up</v-icon>
                  <v-icon
                    v-else
                    style="padding-bottom:10px; color:green"
                    class="interactionIcons"
                  >thumb_up</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                {{info.dislikes}}
                <v-btn icon @click="dislikeButton">
                  <v-icon
                    v-if="dislike==false"
                    style="padding-bottom:10px"
                    class="interactionIcons"
                  >thumb_down</v-icon>
                  <v-icon
                    v-else
                    style="padding-bottom:10px; color:red"
                    class="interactionIcons"
                  >thumb_down</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1">
            <div>
              <v-btn icon>
                <v-icon>playlist_add</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="1">
            <div>
              <v-btn icon @click="favorite">
                <v-icon v-if="fav==false">favorite_border</v-icon>
                <v-icon v-else style="color:red">favorite</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" md="4">
        <v-img
          v-if="info.image==null"
          src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
          width="200"
        ></v-img>
        <v-img v-else :src="info.image" width="250" height="250"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1">
        <div style="
  display:flex;" vertical-align: text-top>
          <div class="songKey">Song key:</div>
          <div class="songKeyValue">{{info.key}}</div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">{{info.description}}</v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="instrumentHeader">Instruments</div>
      </v-col>
    </v-row>
    <v-row>
      <InstrumentsAvailables />
    </v-row>
  </div>
</template>

<script>
import InstrumentsAvailables from "./InstrumentsAvailables";

export default {
  data() {
    return {
      info: {
        id: null,
        name: null,
        username: null,
        description: null,
        key: null,
        main_genre: null,
        likes: null,
        dislikes: null,
        views: null,
        downloads: null,
        image: null
      },
      like: false,
      dislike: false,
      fav: false
    };
  },
  methods: {
    favorite() {
      this.fav = !this.fav;
    },
    likeButton() {
      if (this.like) {
        this.info.likes--;
        this.$http
          .put("/api/sheets/downlike/" + this.$route.params.id)
          .then(response => {
            console.log(response);
          });
      } else {
        this.info.likes++;
        this.$http
          .put("/api/sheets/uplike/" + this.$route.params.id)
          .then(response => {
            console.log(response);
          });
      }
      this.like = !this.like;

      if (this.dislike) {
        this.dislike = false;
        this.info.dislikes--;
        this.$http
          .put("/api/sheets/downdislike/" + this.$route.params.id)
          .then(response => {
            console.log(response);
          });
      }
    },
    dislikeButton() {
      if (this.dislike) {
        this.info.dislikes--;
        this.$http
          .put("/api/sheets/downdislike/" + this.$route.params.id)
          .then(response => {
            console.log(response);
          });
      } else {
        this.info.dislikes++;
        this.$http
          .put("/api/sheets/updislike/" + this.$route.params.id)
          .then(response => {
            console.log(response);
          });
      }
      this.dislike = !this.dislike;

      if (this.like) {
        this.like = false;
        this.info.likes--;
        this.$http
          .put("/api/sheets/downlike/" + this.$route.params.id)
          .then(response => {
            console.log(response);
          });
      }
    }
  },
  components: {
    InstrumentsAvailables
  },

  mounted() {
    this.$http.get("/api/sheets/" + this.$route.params.id).then(response => {
      console.log(response.data[0]);
      this.info = response.data[0];
      this.info.image =
        "http://localhost:8000/api/sheets/image/" + this.info.id;
    });
  }
};
</script>

<style>
.main {
  padding: 50px 0px 0px 50px;
}
.sheetTitle {
  font-size: 48px;
}
.sheetArtist {
  font-size: 24px;
  color: grey;
}
.interactionIcons {
  margin: auto;
}

.songKey {
  padding-top: 5px;
  font-weight: bold;
}
.songKeyValue {
  font-size: 20px;
  padding-left: 10px;
}
.instrumentHeader {
  font-weight: bold;
}
</style>