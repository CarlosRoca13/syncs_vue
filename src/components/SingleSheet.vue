<template>
  <div class="main">
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="9" md="6">
            <v-row style="padding-left:10px">
              <div class="sheetTitle">{{title}}</div>
            </v-row>
            <v-row style="padding-left:10px">
              <div class="sheetArtist">{{artist}}</div>
            </v-row>
            <v-row>
              <v-col cols="2">
                {{views}}
                <v-icon class="interactionIcons">visibility</v-icon>
              </v-col>
              <v-col cols="2">
                {{likes}}
                <v-btn icon @click="likeButton">
                <v-icon v-if="like==false" style="padding-bottom:10px" class="interactionIcons">thumb_up</v-icon>
                <v-icon v-else style="padding-bottom:10px; color:green" class="interactionIcons">thumb_up</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                {{dislikes}}
                <v-btn icon @click="dislikeButton">
                <v-icon v-if="dislike==false" style="padding-bottom:10px" class="interactionIcons">thumb_down</v-icon>
                <v-icon v-else style="padding-bottom:10px; color:red" class="interactionIcons">thumb_down</v-icon>
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
          <v-col cols="1">
            <div>
              <v-btn icon>
                <v-icon>cloud_download</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" md="4">
        <v-img :src="albumImage" width="200"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1">
        <div style="display:flex" vertical-align: text-top>
          <div>Song key:</div>
          <div class="songKeyValue">{{key}}</div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">{{description}}</v-col>
    </v-row>
    <v-row>
      <PDFviewer/>
    </v-row>
  </div>
</template>

<script>
import PDFviewer from "./PDFviewer";
export default {
  data() {
    return {
      id: this.$route.params.id,
      title: "Anne",
      artist: "John Frusciante",
      albumImage:
        "https://img.discogs.com/g37kX9qyHZvq0hnf5sHhJAOe3PU=/fit-in/600x534/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-931811-1459393353-6812.jpeg.jpg",
      likes: 300,
      like:false,
      dislikes: 30,
      dislike:false,
      views: 1200,
      fav: false,
      key: "Am",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus ullamcorper commodo. Integer mi lectus, vestibulum vel orci eget, fringilla consequat orci. Sed quis pharetra erat. Nunc blandit nulla eget felis auctor, et porttitor turpis condimentum. Suspendisse aliquam dictum diam, id cursus dolor congue at. Phasellus sed posuere justo. Nam laoreet libero ac rhoncus fringilla. Sed mattis tincidunt eros eu fringilla. Aenean non ipsum est. Duis sodales turpis eget tincidunt tempor. Nunc est ex, eleifend id felis vitae, elementum tristique augue. Curabitur tincidunt bibendum tortor ac tristique. Ut interdum iaculis diam. "
    };
  },
  methods: {
    favorite() {
      this.fav = !this.fav;
    },
    likeButton(){
      this.like=!this.like;
      if(this.dislike){
        this.dislike=false;
      }
    },
    dislikeButton(){
      this.dislike =!this.dislike;
      if(this.like){
        this.like=false;
      }
    }
  },
  components: {
    PDFviewer
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
  padding-left: 3px;
}

.songKey{
  padding-top: 5px;
}
.songKeyValue {
  font-size: 20px;
  padding-left: 5px;
}
</style>