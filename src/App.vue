<template>
  <v-app>
    <Navbar/>
    <v-content class="styleApp">
      <router-view class="styleApp"/>
    </v-content>
    <Footer/>
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
}
</style>