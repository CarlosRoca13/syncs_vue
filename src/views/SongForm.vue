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

}
</script>

<style>

</style>