<template>
  <div class="main">
    <div class="uploadInstrumentContainer">
      <span class="display-3">Add an Instrument</span>
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="inputDiv">
          <div class="headline font-weight-light labelTitle"><label>Instrument</label></div>
          <v-select
            v-model="sheetinstrument.instruments"
            :items="instruments"
            :rules="[v => !!v || 'Instrument is required']"
            label="Instrument"
            required
            solo
            color="#38A694"
          ></v-select>
        </div>
        <div class="inputDiv">
          <div class="headline font-weight-light labelTitle"><label>Effects</label></div>
          <v-select
            v-model="sheetinstrument.effects"
            :items="effects"
            :rules="[v => !!v || 'Effect is required']"
            label="Effects"
            required
            solo
            color="#38A694"
          ></v-select>
        </div>
        <div class="inputDiv">
          <div class="headline font-weight-light labelTitle"><label>Sheet Instrument</label></div>
          <v-file-input v-model="sheetinstrument.pdf" accept=".pdf" label="File input" solo color="#38A694"></v-file-input>
        </div>

        <v-btn
              :disabled="!valid"
              class="mr-4"
              style="text-transform: capitalize"
              color="#38A694"
              x-large
              @click="validate"
            >
              <v-icon left color="white">edit</v-icon> <span class="white--text">Add Instrument</span>
              
            </v-btn>

        <v-btn
              class="ma-4"
              style="text-transform: capitalize"
              color="#bf4222"
              dark
              x-large
              @click="reset"
            >
            Reset
            </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      valid: true,
      instruments: ["Piano", "Guitar", "Drums", "Trumpet"],
      effects: ["None", "Item 2", "Item 3", "Item 4"],
      sheetinstrument: {
        sheetid: this.$route.params.id,
        instruments: null,
        effects: null,
        pdf: null
      },
      checkbox: false
    };
  },
  methods: {
    validate() {
      const formData = new FormData();
      formData.append("sheets_id", this.sheetinstrument.sheetid);
      formData.append("instrument", this.sheetinstrument.instruments);
      formData.append("effects", this.sheetinstrument.effects);
      formData.append("pdf", this.sheetinstrument.pdf);
      this.$http
        .post("/api/sheetinstrument", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          console.log(response);
        });
      window.location.href =
        "http://localhost:8080/sheets/" + this.$route.params.id;
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
.uploadInstrumentContainer {
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
</style>