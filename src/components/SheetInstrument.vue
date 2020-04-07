<template>
  <div class="main">
    <v-row>
      <v-col cols="3">
        <v-row class="songName">{{info.name}}</v-row>
        <v-row class="artistName">{{info.username}}</v-row>
      </v-col>
      <v-col>
        <DownloadButton :sheetId="id" :instrument="instrument"/>
      </v-col>
    </v-row>
    <v-row>
      <InstrumentsAvailables />
    </v-row>
    <v-row class="instrumentTitle">{{instrument}}</v-row>
    <pdfviewer/>
  </div>
</template>

<script>
import pdfviewer from "./PDFviewer";
import InstrumentsAvailables from "./InstrumentsAvailables";
import DownloadButton from './DownloadButton';
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
      id: this.$route.params.id,
      instrument: this.$route.params.instrument
    };
  },

  components: {
    pdfviewer,
    InstrumentsAvailables,
    DownloadButton
  },

  mounted() {
    this.$http.get("/api/sheets/" + this.$route.params.id).then(response => {
      console.log(response.data[0]);
      this.info = response.data[0];
    });
  }
};
</script>

<style>
.main {
  padding-left: 50px;
}
.songName {
  font-size: 48px;
}
.artistName {
  font-size: 24px;
  color: grey;
}
.instrumentTitle {
  padding-top: 20px;
  font-size: 24px;
  color: grey;
  text-transform: capitalize;
}
</style>