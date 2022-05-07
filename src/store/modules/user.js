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
   * 进行请求的发送
   */
  actions: {
    async login({ state }, { username, password }) {
      const data = await LoginService.login(username, password)
      state.userInfo = data.user
      localStorage.setItem('jwt', data.token)
    }
  },

  getters: {
  },

  mutations: {

  }
}


export default user
