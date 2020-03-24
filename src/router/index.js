import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Upload from '../components/Upload.vue'
import Sheets from '../views/Sheets'
import SingleSheet from '../components/SingleSheet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
