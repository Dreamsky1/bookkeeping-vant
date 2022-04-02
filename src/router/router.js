import VueRouter from 'vue-router'
import { routers } from "./routers";
import Vue from 'vue'

Vue.use(VueRouter)
const router = new VueRouter({
  name: 'history',
  routes: routers
})

// 路由拦截 router.js
router.afterEach((to, from) => {
  // console.log(to, from);
  if (!(from.path === '/' && from.name === null)) {
    setLocalRoute(to, from)
  }
});

function setLocalRoute(to, from) {
  // 本地已访问页面路由,存5条
  const localRoute = window.vue.localRoute = window.vue.localRoute || [];
  console.log(localRoute);
  const from_index = localRoute.indexOf(from.path);
  const to_index = localRoute.indexOf(to.path);
  if (from_index < 0) {
    localRoute.unshift(from.path);
    to_index >= 0 && localRoute.splice(to_index, 1)
  }
  if (localRoute.length > 5) {
    localRoute.splice(0, 1)
  }
}

export default router
