<template>
  <v-container>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="sheetinstrument.instruments"
        :items="instruments"
        :rules="[v => !!v || 'Instrument is required']"
        label="Instrument"
        required
      ></v-select>

      <v-select
        v-model="sheetinstrument.effects"
        :items="effects"
        :rules="[v => !!v || 'Effect is required']"
        label="Effects"
        required
      ></v-select>

      <v-file-input v-model="sheetinstrument.pdf" accept=".pdf" label="File input"></v-file-input>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Accept</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      valid: true,
      instruments: ["Piano", "Guitar", "Battery", "Trumpet"],
      effects: ["None", "Item 2", "Item 3", "Item 4"],
      sheetinstrument: {
        sheetid: this.$route.params.id,
        instruments: null,
        effects: null,
        pdf: null
      },
      checkbox: false,
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
          .post('/api/sheetinstrument', formData, {headers: {
                    'Content-Type': 'multipart/form-data'
                  }
        })
        .then(function(response) {
          console.log(response);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
