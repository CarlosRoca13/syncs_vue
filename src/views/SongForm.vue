<template>
  <v-container>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="song.name" 
        label="Name"
        required
      ></v-text-field>
      <v-textarea
        v-model="song.description"
        label="Description"
        required
      ></v-textarea>
      <v-select
        v-model="song.key"
        :items="key"
        :rules="[v => !!v || 'Key is required']"
        label="Key"
        required
      ></v-select>

      <v-select
        v-model="song.maingenre"
        :items="genres"
        :rules="[v => !!v || 'A genre is required']"
        label="Main genre"
        required
      ></v-select>

      <v-file-input v-model="song.image" accept="image/*" label="Image input"></v-file-input>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Accept</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "SongForm",
  data() {
    return {
      valid: true,
      key: ["A", "A#", "Ab", "Am", "A#m", "Abm", "B", "B#", "Bb", "Bm", "B#m", "Bbm", "C", "C#", "Cb", "Cm", "C#m", "Cbm", "D", "D#", "Db", "Dm", "D#m", "Dbm", "E", "E#", "Eb", "Em", "E#m", "Ebm", "E", "E#", "Eb", "Em", "E#m", "Ebm", "F", "F#", "Fb", "Fm", "F#m", "Fbm", "G", "G#", "Gb", "Gm", "G#m", "Gbm"],
      genres: ["Blues", "Classic", "Funk", "Grunge", "Jazz", "Metal", "Pop", "Punk", "Reggae", "Reggaeton", "Rock", "Salsa","Techno"],
      song: {
        name: null,
        description: '',
        key: null,
        maingenre: null,
        image: null
      },
      checkbox: false,
    };
  },
  methods: {
    validate() {
      var id = JSON.parse(localStorage.getItem("activeUser")).id;
      const formData = new FormData();
      formData.append("name", this.song.name);
      formData.append("clients_id", id); //cojer id de la session
      formData.append("description", this.song.description);
      formData.append("key", this.song.key);
      formData.append("main_genre", this.song.maingenre);
      formData.append("views", 0);
      formData.append("downloads", 0);
      if (this.song.image != null) {
        formData.append("image", this.song.image);
      }
      console.log(formData);
      this.$http
          .post('/api/sheets', formData, {headers: {
                    'Content-Type': 'multipart/form-data'
                  }
        })
        .then(function(response) {
          window.location.href = 'http://localhost:8080/sheets/'+response.data;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>