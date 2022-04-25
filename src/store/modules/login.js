// import { LoginService } from '../../service/service'
const login = {
  namespaced: true,

  state: {
    username: '测试一下vuex的使用喽',
    data: '',
    user: {
      username: 'test'
    }
  },

  actions: {
    /**
    登录
     */
    // async login({ state }, { username, password }) {
    //   const data = await LoginService.login(username, password) // 获取用户的相关信息一起返回过来 存储在state中
    //   state.user = data.user
    //   localStorage.setItem('jwt', data.token)
    // },
    //
    // /**
    //  注册
    //  */
    // async register({ username, password }) {
    //   await LoginService.register(username, password)
    // }
  },

  mutations: {

  }
}

export default login
