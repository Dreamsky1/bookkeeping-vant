import { LoginService } from '../../service/service'
const login = {
  namespaced: true,

  state: {
    username: '测试一下vuex的使用喽',
  },

  actions: {
    async login({ state }, { username, password }) {
      const data = await LoginService.login(username, password) // 获取用户的相关信息一起返回过来 存储在state中
      state.username = username
      localStorage.setItem('jwt', data.token)
      console.log('输出这个data', data)
    }
  },

  mutations: {

  }
}

export default login
