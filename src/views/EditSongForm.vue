<template>
  <div class="main">
    <div class="createSongContainer">
      <span class="display-3">Create Song</span>

      <v-form ref="form" v-model="valid" lazy-validation class="formSongContainer">
        <div class="inputDiv">
          <div class="headline font-weight-light labelTitle">
            <label>Name</label>
          </div>
          <v-text-field v-model="song.name" label="Name" solo required color="#38A694"></v-text-field>
        </div>
        <div class="headline font-weight-light labelTitle">
          <label>Description</label>
        </div>
        <v-textarea v-model="song.description" label="Description" solo required color="#38A694"></v-textarea>

        <div class="inputDiv">
          <div class="selectContainer">
            <div class="headline font-weight-light labelTitle">
              <label>Key</label>
            </div>
            <v-select
              v-model="song.key"
              :items="key"
              :rules="[v => !!v || 'Key is required']"
              label="Key"
              solo
              required
              color="#38A694"
            ></v-select>
          </div>
          <div class="selectContainer">
            <div class="headline font-weight-light labelTitle">
              <label>Main Genre</label>
            </div>
            <v-select
              v-model="song.main_genre"
              :items="genres"
              :rules="[v => !!v || 'A genre is required']"
              label="Main genre"
              solo
              required
              color="#38A694"
            ></v-select>
          </div>
        </div>
        <div class="inputDiv">
          <div class="headline font-weight-light labelTitle">
            <label>Song Image</label>
          </div>
          <v-img
            v-if="song.realImage==null"
            src="https://i.ya-webdesign.com/images/placeholder-image-png-7.png"
            width="250"
			class="center-img"
          ></v-img>
          <v-img v-else :src="song.realImage" width="250" height="250" class="center-img"></v-img>
          <v-file-input
            v-model="song.image"
            accept="image/*"
            label="Image input"
            solo
            color="#38A694"
          ></v-file-input>
        </div>
        <v-btn
          :disabled="!valid"
          class="mr-4"
          style="text-transform: capitalize"
          color="#38A694"
          dark
          x-large
          @click="validate"
        >
          <v-icon left color="white">edit</v-icon>Create Song
        </v-btn>
        <!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Accept</v-btn> -->
        <v-btn
          class="ma-4"
          style="text-transform: capitalize"
          color="#bf4222"
          dark
          x-large
          @click="reset"
        >Reset</v-btn>
        <!-- <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn> -->
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditSongForm",
  data() {
    return {
      valid: false,
      key: [
        "A",
        "A#",
        "Ab",
        "Am",
        "A#m",
        "Abm",
        "B",
        "B#",
        "Bb",
        "Bm",
        "B#m",
        "Bbm",
        "C",
        "C#",
        "Cb",
        "Cm",
        "C#m",
        "Cbm",
        "D",
        "D#",
        "Db",
        "Dm",
        "D#m",
        "Dbm",
        "E",
        "E#",
        "Eb",
        "Em",
        "E#m",
        "Ebm",
        "E",
        "E#",
        "Eb",
        "Em",
        "E#m",
        "Ebm",
        "F",
        "F#",
        "Fb",
        "Fm",
        "F#m",
        "Fbm",
        "G",
        "G#",
        "Gb",
        "Gm",
        "G#m",
        "Gbm"
      ],
      genres: [
        "Blues",
        "Classic",
        "Funk",
        "Grunge",
        "Jazz",
        "Metal",
        "Pop",
        "Punk",
        "Reggae",
        "Reggaeton",
        "Rock",
        "Salsa",
        "Techno"
      ],
      song: {
        name: null,
        description: "",
        key: null,
        main_genre: null,
        image: null,
        realImage: null
      },
      checkbox: false
    };
  },
  async mounted() {
    await this.$http
      .get("http://localhost:8000/api/sheets/" + this.$route.params.id)
      .then(response => {

        this.song.name = response.data[0].name;
        this.song.description = response.data[0].description;
        this.song.key = response.data[0].key;
        this.song.main_genre = response.data[0].main_genre;
		this.song.realImage = response.data[0].image;
		
        if (this.song.realImage != null) {
          this.song.realImage =
            "http://localhost:8000/api/sheets/image/" + this.$route.params.id;
        }
      });
  },
  methods: {
    validate() {
      var id = JSON.parse(localStorage.getItem("activeUser")).id;
      const formData = new FormData();
      formData.append("name", this.song.name);
      formData.append("clients_id", id); //cojer id de la session
      formData.append("description", this.song.description);
      formData.append("key", this.song.key);
      formData.append("main_genre", this.song.main_genre);
      formData.append("views", 0);
      formData.append("downloads", 0);
      if (this.song.image != null) {
        formData.append("image", this.song.image);
      }
      //console.log(formData);
      this.$http
        .post("/api/sheets/"+this.$route.params.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          window.location.href =
            "http://localhost:8080/sheets/" + response.data;
        });
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
.createSongContainer {
  margin: auto;
  width: 75%;
  border-radius: 20px;
  padding: 30px;
}
.inputDiv {
  padding-top: 20px;
}
.selectContainer {
  display: inline-block;
  padding-right: 20px;
}
.labelTitle {
  padding-bottom: 15px;
  color: #1f1f1f;
}
.center-img{
  margin: auto;
  margin-bottom: 20px;
}
</style>