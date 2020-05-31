import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import Vuex from "vuex"
import vuetify from './plugins/vuetify';
import axios from 'axios'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import "./vee-validate";
import VueSimpleAlert from "vue-simple-alert";

import vueSmoothScroll from 'vue2-smooth-scroll'
Vue.use(vueSmoothScroll)

Vue.config.productionTip = false
/*
Vue.use(Vuex);

const store = new Vuex.Store(
  {
    state: {
      authenticated: false
    },
    mutations: {
      setAuthentication(state, status) {
        state.authenticated = status;
      }
    }
  }
);*/
axios.defaults.baseURL = `http://localhost:8000`
Vue.prototype.$http = axios
Vue.use(VueSimpleAlert);

Vue.filter('to-uppercase', function(value){
  return value.toUpperCase();
});

Vue.filter('snippet', function(value){
  return value.slice(0,100)
});

new Vue({
  router,
  //store: store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

/*
// Provisional -> Se elimina activeUser al refrescar/cerrar la pestaña del navegador
window.onunload = () => {
  window.localStorage.removeItem('activeUser');
};*/