import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

import 'vant/lib/index.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
