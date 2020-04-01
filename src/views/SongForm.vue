<template>
  <v-container>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field 
      label="Song Name"
      required
      ></v-text-field>
      <v-textarea
      label="Description"
      required></v-textarea>
      <v-select
        :items="key"
        :rules="[v => !!v || 'Key is required']"
        label="Key"
        required
      ></v-select>

      <v-select
        :items="genres"
        :rules="[v => !!v || 'A genre is required']"
        label="Main genre"
        required
      ></v-select>

      <v-file-input accept="image/*" label="Image input"></v-file-input>

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
      key: ["E minor", "E major", "E#"],
      genres: ["Item 2", "Item 3", "Item 4"],
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
      formData.append("sheetId", this.sheetinstrument.sheetid);
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