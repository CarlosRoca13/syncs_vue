import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Upload from '../views/Upload.vue'
import Sheets from '../views/Sheets'
import SingleSheet from '../components/SingleSheet.vue'
import Login from "../views/Login.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/upload/:id',
    name: 'Upload',
    component: Upload,
    /*beforeEnter: (to, from, next) => {
      if(store.state.authenticated == false) {
        next("/login");
      } else {
        next();
      }
    }*/
  },
  {
    path: '/sheets',
    name: 'Sheets',
    component: Sheets
  },
  {
    path: '/sheets/:id',
    name: 'SingleSheet',
    component: SingleSheet
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
