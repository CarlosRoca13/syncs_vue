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
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon class="interactionIcons" v-on="on">visibility</v-icon>
                  </template>
                  <span>Total views</span>
                </v-tooltip>
              </v-col>
              <v-col cols="3">
                {{info.likes}}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon @click="likeButton" v-on="on">
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
                  </template>
                  <span>Like song</span>
                </v-tooltip>
              </v-col>
              <v-col cols="2">
                {{info.dislikes}}
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon @click="dislikeButton" v-on="on">
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
                  </template>
                  <span>Dislike song</span>
                </v-tooltip>
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
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon @click="favorite" v-on="on">
                    <v-icon v-if="fav==false">favorite_border</v-icon>
                    <v-icon v-else style="color:red">favorite</v-icon>
                  </v-btn>
                </template>
                <span v-if="fav==false">Add to favorites</span>
                <span v-else>Delete to favorites</span>
              </v-tooltip>
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
      <v-col cols="8">
        <div class="descriptionContainer">{{info.description}}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1" style="display:flex;">
        <div class="instrumentHeader">Instruments</div>
        <div class="addButton" v-if="isCreator()">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="addInstrument()" v-on="on">
                <v-icon>post_add</v-icon>
              </v-btn>
            </template>
            <span>Add Sheet</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <InstrumentsAvailables />
    </v-row>
    <v-row>
      <div class="commentHeader">Comments</div>
    </v-row>
    <v-row>
      <CommentSection />
    </v-row>
  </div>
</template>

<script>
import InstrumentsAvailables from "./InstrumentsAvailables";
import CommentSection from "./CommentSection";

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
      fav: false,
      comments: []
    };
  },
  methods: {
    favorite() {
      if (this.fav == false) {
        this.$http.post(
          "/api/favorite/" +
            this.$route.params.id +
            "/" +
            JSON.parse(localStorage.getItem("activeUser")).id
        );
        this.fav = true;
      } else {
        this.$http.delete(
          "/api/favorite/" +
            this.$route.params.id +
            "/" +
            JSON.parse(localStorage.getItem("activeUser")).id
        );
        this.fav = false;
      }
    },
    isCreator() {
      if (
        this.info.username ==
        JSON.parse(localStorage.getItem("activeUser")).username
      ) {
        return true;
      } else {
        return false;
      }
    },
    addInstrument() {
      window.location.href =
        "http://localhost:8080/Upload/" + this.$route.params.id;
    },
    likeButton() {
      if (this.like) {
        this.info.likes--;
        this.$http
          .put(
            "/api/sheets/downlike/" +
              this.$route.params.id +
              "/" +
              JSON.parse(localStorage.getItem("activeUser")).id
          )
          .then(response => {
            console.log(response);
          });
      } else {
        this.info.likes++;
        this.$http
          .put(
            "/api/sheets/uplike/" +
              this.$route.params.id +
              "/" +
              JSON.parse(localStorage.getItem("activeUser")).id
          )
          .then(response => {
            console.log(response);
          });
      }
      this.like = !this.like; //Cambio de color del icono
      if (this.dislike) {
        this.dislike = false;
        this.info.dislikes--;
        this.$http
          .put(
            "/api/sheets/downdislike/" +
              this.$route.params.id +
              "/" +
              JSON.parse(localStorage.getItem("activeUser")).id
          )
          .then(response => {
            console.log(response);
          });
      }
    },
    dislikeButton() {
      if (this.dislike) {
        this.info.dislikes--;
        this.$http
          .put(
            "/api/sheets/downdislike/" +
              this.$route.params.id +
              "/" +
              JSON.parse(localStorage.getItem("activeUser")).id
          )
          .then(response => {
            console.log(response);
          });
      } else {
        this.info.dislikes++;
        this.$http
          .put(
            "/api/sheets/updislike/" +
              this.$route.params.id +
              "/" +
              JSON.parse(localStorage.getItem("activeUser")).id
          )
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
    InstrumentsAvailables,
    CommentSection
  },

  async mounted() {
    await this.$http.put("/api/sheets/upview/" + this.$route.params.id);
    this.$http.get("/api/sheets/" + this.$route.params.id).then(response => {
      console.log(response.data[0]);
      this.info = response.data[0];
      if (this.info.image != null) {
        this.info.image =
          "http://localhost:8000/api/sheets/image/" + this.$route.params.id;
      }
    });
    this.$http
      .get(
        "/api/sheets/getuserlike/" +
          this.$route.params.id +
          "/" +
          JSON.parse(localStorage.getItem("activeUser")).id
      )
      .then(response => {
        console.log("Liked? " + response.data);
        this.like = response.data;
      });
    this.$http
      .get(
        "/api/sheets/getuserdislike/" +
          this.$route.params.id +
          "/" +
          JSON.parse(localStorage.getItem("activeUser")).id
      )
      .then(response => {
        console.log("Disliked? " + response.data);
        this.dislike = response.data;
      });
    this.$http
      .get(
        "/api/favorite/" +
          this.$route.params.id +
          "/" +
          JSON.parse(localStorage.getItem("activeUser")).id
      )
      .then(response => {
        console.log("Favorite? " + response.data);
        this.fav = response.data;
      });
  }
};
</script>

<style>
.main {
  padding: 50px 0px 0px 50px;
  background-color: #f2f2f2;
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
  font-size: 24px;
  padding-right: 5px;
  margin-top: 10px;
}
.commentHeader {
  font-size: 24px;
  padding-right: 10px;
  margin-top: 30px;
}
.descriptionContainer {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: whitesmoke;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>