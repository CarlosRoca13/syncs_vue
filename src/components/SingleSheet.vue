<template>
  <div class="main">
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="9" md="8">
            <v-row>
              <div class="sheetTitle">{{title}}</div>
            </v-row>
            <v-row>
              <div class="sheetArtist">{{artist}}</div>
            </v-row>
            <v-row>
              <v-col cols="3">
                {{views}}
                <v-icon>visibility</v-icon>
              </v-col>
              <v-col cols="2">
                {{likes}}
                <v-icon>thumb_up</v-icon>
              </v-col>
              <v-col cols="2">
                {{dislikes}}
                <v-icon>thumb_down</v-icon>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="1">
            <div>
              <v-btn >
                <v-icon>playlist_add</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="1"> 
            <div>
              <v-btn @click="favorite">
                <v-icon v-if="fav">favorite_border</v-icon>
                <v-icon v-else>favorite</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="1">
            <div>
              <v-btn >
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
      <v-col cols="10">
        {{description}}
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      title: "Anne",
      artist: "John Frusciante",
      albumImage:
        "https://img.discogs.com/g37kX9qyHZvq0hnf5sHhJAOe3PU=/fit-in/600x534/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-931811-1459393353-6812.jpeg.jpg",
      likes: 300,
      dislikes: 30,
      views: 1200,
      fav: false,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus ullamcorper commodo. Integer mi lectus, vestibulum vel orci eget, fringilla consequat orci. Sed quis pharetra erat. Nunc blandit nulla eget felis auctor, et porttitor turpis condimentum. Suspendisse aliquam dictum diam, id cursus dolor congue at. Phasellus sed posuere justo. Nam laoreet libero ac rhoncus fringilla. Sed mattis tincidunt eros eu fringilla. Aenean non ipsum est. Duis sodales turpis eget tincidunt tempor. Nunc est ex, eleifend id felis vitae, elementum tristique augue. Curabitur tincidunt bibendum tortor ac tristique. Ut interdum iaculis diam. "
    };
  },
  methods: {
    favorite() {
      this.fav = !this.fav;
    }
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

</style>