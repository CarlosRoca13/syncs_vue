<template>
  <v-app>
    <Navbar/>
    <v-content>
      <router-view class="styleApp"/>
      <Footer/>
    </v-content> 
      
   
    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from "@/components/Footer";
export default {
  name: 'App',
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
.styleApp{
  background-color: white; 
  position: relative;
  min-height: 100vh;
}
</style>