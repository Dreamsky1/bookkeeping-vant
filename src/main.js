import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import moment from "moment";

import 'vant/lib/index.css'
import animated from 'animate.css'

Vue.use(animated)
Vue.config.productionTip = false
Vue.prototype.$moment = moment

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
