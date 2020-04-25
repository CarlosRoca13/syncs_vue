<template>
  <v-app>
    <Navbar/>
    <v-content>
      <router-view class="styleApp"/>
      <BackToTopButton/>
      <Footer/>
    </v-content> 
      
   
    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from "@/components/Footer";
import BackToTopButton from './components/BackToTopButton';
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    BackToTopButton
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
  min-height: 150vh;
}
</style>