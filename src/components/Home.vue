<template>
  <v-app>
    
  </v-app>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    
  }),
  methods: {
      peticionPost() {
          this.$http.delete('/clients/3').then(console.log('Done'))
      }
  }
};
</script>

<style> 
    
</style>