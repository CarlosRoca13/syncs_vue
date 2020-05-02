<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn icon @click="downloadPdf" v-on="on">
        <v-icon>get_app</v-icon>
      </v-btn>
    </template>
    <span>Download Sheet</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    sheetId: Number,
    instrument: String
  },
  methods: {
    downloadPdf() {
      this.$http
        .get(
          "/api/sheetinstrument/download/" +
            this.sheetId +
            "/" +
            this.instrument,
          { responseType: "arraybuffer" }
        )
        .then(response => {
          let blob = new Blob([response.data], { type: "application/pdf" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "sheet.pdf"; //quan funcione canviar açò per el nom del pdf
          link.click();
        });
    }
  }
};
</script>

<style scoped>
</style>