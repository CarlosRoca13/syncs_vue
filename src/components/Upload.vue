<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select v-model="select" :items="instruments" :rules="[v => !!v || 'Instrument is required']" label="Instrument" required></v-select>

      <v-select v-model="defaultSelected" :items="effects" :rules="[v => !!v || 'Effect is required']" label="Effects" required></v-select>

      <v-file-input accept=".pdf" label="File input"></v-file-input>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Accept
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Cancel
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>

export default {
  name: 'Upload',
  data: () => ({
      valid: true,
      select: null,
      defaultSelected: 'None',
      instruments: [
        'Piano',
        'Guitar',
        'Battery',
        'Trumpet',
      ],
      effects: [
        'None',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
};
</script>

<style> 
    
</style>