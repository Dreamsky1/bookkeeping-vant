import VueRouter from 'vue-router'
import { routers } from "./routers";
import Vue from 'vue'

Vue.use(VueRouter)
const router = new VueRouter({
  name: 'history',
  routes: routers
})


export default router
