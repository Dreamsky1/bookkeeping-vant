<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition name="page-go">
      <router-view class="page"></router-view>
    </transition>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },

  computed: {
    direction () {
      const currentPath = this.$route.path;
      const localRoute = (window.vue && window.vue.localRoute) || [];
      const index = localRoute.indexOf(currentPath);
      let tranName = '';

      if (localRoute.length === 0) {
        tranName = 'fade'; // 首页，渐显
      } else if (index >= 0) {
        tranName = 'page-back'; // 回退，右划
      } else {
        tranName = 'page-go'; // 进入新页面，左划
      }
      return tranName;
    }
  }
}
</script>

<style>
.page{
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-in-out;
}
.page-go-enter-active {
  transform: translate3d(100%, 0, 0);
}
.page-go-enter-to {
  transform: translate3d(0, 0, 0);
}
.page-go-leave-active {
  transform: translate3d(0, 0, 0);
}
.page-go-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.page-back-enter-active {
  transform: translate3d(-100%, 0, 0);
}
.page-back-enter-to {
  transform: translate3d(0, 0, 0);
}
.page-back-leave-active {
  transform: translate3d(0, 0, 0);
}
.page-back-leave-to {
  transform: translate3d(100%, 0, 0);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  margin: 0;
}
</style>
