
const user = {
  namespaced: true,

  state: {
    users: [{
      name: '小米',
      id: 0
    }]
  },

  /**
   * 进行请求的发送
   */
  actions: {
  },

  getters: {
    users (state) {
      return state.users
    }
  },

  mutations: {

  }
}


export default user
