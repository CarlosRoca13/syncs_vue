<template>
  <v-app>
    <Navbar/>
    <v-content>
      <router-view/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from "@/components/Footer";
export default {
  name: 'App',
  beforeCreate: function() {
      document.body.style.padding = "20px";
      document.body.style.backgroundImage = "linear-gradient(to right, "+ "#BF4222" +", "+ "#183A37" +")";
  },
  components: {
    Navbar,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  
</style>