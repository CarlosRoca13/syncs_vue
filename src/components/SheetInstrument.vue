<template>
  <div class="main">
    <v-row>
      <v-col cols="3">
        <v-row class="songName">
          <a class="songTitleLink" :href="songUrl">{{info.name}}</a>
        </v-row>
        <v-row class="artistName">{{info.username}}</v-row>
      </v-col>
      <v-col>
        <DownloadButton :sheetId="id" :instrument="instrument" />
      </v-col>
    </v-row>
    <v-row>
      <InstrumentsAvailables />
    </v-row>
    <v-row>
      <v-col style="padding-top:50px;">
        <div class="instrumentContainer">
          <span class="display-1 font-weight-light instrumentTitle">{{instrument}}
            <v-btn
              class="ma-2"
              v-show="scrollButton"
              style="text-transform: capitalize"
              color="#38A694"
              tile
              dark
              large
              @click="pageScroll()"
            >
              <v-icon>play_arrow</v-icon>
            </v-btn>
            <v-btn
              class="ma-2"
              v-show="!scrollButton"
              style="text-transform: capitalize"
              color="#38A694"
              tile
              dark
              large
              @click="stopPageScroll()"
            >
              <v-icon>stop</v-icon>
            </v-btn>
          </span>
          <!-- <div effectsTitle>
          <span class="headline font-weight-light">Effects: </span>
          </div>-->
          <pdfviewer />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import pdfviewer from "./PDFviewer";
import InstrumentsAvailables from "./InstrumentsAvailables";
import DownloadButton from "./DownloadButton";
export default {
  data() {
    return {
      intervalId: null,
      scrollButton: true,
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
      instrument: this.$route.params.instrument,
      songUrl: "http://localhost:8080/sheets/" + this.$route.params.id
    };
  },
  methods: {
    pageScroll() {
      this.scrollButton = !this.scrollButton;
      this.intervalId = window.setInterval(() => {
        // If at page bottom, scroll by to top
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
          window.scrollTo(0, 0);
        // Scroll 1px down
        else window.scrollBy(0, 1);
      }, 25);
    },
    stopPageScroll(){
      this.scrollButton = !this.scrollButton;
      window.clearInterval(this.intervalId);
    }
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
  padding-bottom: 80px;
}
.songName {
  font-size: 48px;
}
.artistName {
  font-size: 24px;
  color: grey;
  padding-bottom: 20px;
}
.instrumentTitle {
  color: grey;
  text-transform: capitalize;
}
.songTitleLink:link {
  color: #1f1f1f;
  text-decoration: none;
}

.songTitleLink:visited {
  text-decoration: none;
  color: #1f1f1f;
}

.songTitleLink:hover {
  text-decoration: underline;
}

.instrumentContainer {
  padding: 20px;
  width: 95%;
  background-color: whitesmoke;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.effectsTitle {
  padding-top: 30px;
}
</style>