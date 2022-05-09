import { LoginService } from '../../service'
const user = {
  namespaced: true,

  state: {
    userInfo: {
      username: 'test',
      signature: '写个签名吧',
      integral: 0
    }
  },

  /**
   *
   */
  actions: {
    async login({ state }, { username, password }) {
      const data = await LoginService.login(username, password)
      state.userInfo = data.user
      localStorage.setItem('jwt', data.token)
      localStorage.setItem('user_id', data.user.id)
      localStorage.setItem('username', data.user.username)
    },

    async register({ state }, { username, password }) {
      state.userInfo.username = username
      return await LoginService.register(username, password)
    }
  },

  getters: {
  },

  mutations: {

  }
}


export default user
