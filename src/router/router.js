import VueRouter from 'vue-router'
import { routers } from "./routers";
import Vue from 'vue'

Vue.use(VueRouter)
const router = new VueRouter({
  name: 'history',
  routes: routers
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 判断是否登录了，没有登录直接跳转到登录页面
  if (localStorage.getItem('jwt') || !to.meta.isAuth) {
    next()
  } else {
    // 本地登录测试
    // next()
    next({
      path: '/login'
    })
  }
})

// 全局后置路由守卫
router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '记账app'
  }
})


export default router
