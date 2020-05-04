import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Upload from '../views/Upload.vue'
import Sheets from '../views/Sheets'
import MySheets from '../views/MySheets'
import SingleSheet from '../components/SingleSheet.vue'
import SheetInstrument from '../components/SheetInstrument'
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import SongForm from "../views/SongForm.vue"
import Vuex from "vuex"
import Profile from "../views/Profile.vue"
import ArtistPublicProfile from "../views/ArtistPublicProfile"
import Artists from '../views/Artists'

Vue.use(VueRouter)

Vue.use(Vuex);
// const store = new Vuex.Store(
//   {
//     state: {
//       authenticated: false
//     },
//     mutations: {
//       setAuthentication(state, status) {
//         state.authenticated = status;
//       }
//     }
//   }
// );

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
        next("/upload/:id");
      }
    }*/
  },
  {
    path: '/createsong',
    name: 'SongForm',
    component: SongForm
  },
  {
    path: '/sheets',
    name: 'Sheets',
    component: Sheets
  },
  {
    path: '/mysheets',
    name: 'MySheets',
    component: MySheets
  },
  {
    path: '/sheets/:id',
    name: 'SingleSheet',
    component: SingleSheet
  },
  {
    path: '/sheets/:id/:instrument',
    name: 'SheetInstrument',
    component: SheetInstrument
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "Register",
    component: Register
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists
  },
  {
    path: "/artistProfile/:id",
    name: "ArtistProfile",
    component: ArtistPublicProfile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redireccionar a login si se intenta acceder a zona protegida
  const publicPages = ['/login', '/signup', '/', '/sheets/:id/:instrument', '/sheets/:id', '/sheets', '/artistProfile/:id', ''];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('activeUser');

  if(loggedIn){
    const item = JSON.parse(loggedIn)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      console.log("Tiempo expirado, eliminando item.")
      localStorage.removeItem('activeUser')
      return next('/login');
    }  
  }
  
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router
