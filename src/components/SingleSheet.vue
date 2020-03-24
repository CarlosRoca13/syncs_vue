<template>
  <div class="main">
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" md="8">
            <v-row>
              <div class="sheetTitle">{{title}}</div>
            </v-row>
            <v-row>
              <div class="sheetArtist">{{artist}}</div>
            </v-row>
          </v-col>
          <v-col cols="1">
            <div class="iconsTop">
              <v-btn>
                <v-icon>playlist_add</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col>
            <div class="iconsTop">
              <v-btn>
                <v-icon>favorite_border</v-icon>
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
      <v-col>
        
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
        dislikes:30,
        views: 1200,
    };
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
.iconsTop {
  display: inline-block;
  padding-right: 30px;
}
</style>