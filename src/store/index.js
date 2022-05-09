import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import login from './modules/login'
import category from './modules/category'
import bill from './modules/bill';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    login,
    category,
    bill
  },

  state:{},

  actions: {},

  mutations: {}

})
