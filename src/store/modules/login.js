import { LoginService } from '../../service/service'
const login = {
  namespaced: true,

  state: {
    username: '测试一下vuex的使用喽',
    data: ''
  },

  actions: {
    async login({ state }, { username, password }) {
      const data = await LoginService.login(username, password) // 获取用户的相关信息一起返回过来 存储在state中
      state.username = username
      localStorage.setItem('jwt', data.token)
      console.log('输出这个data', data)
    },

    // 下面是测试的之后可以删除掉
    async create({ state }, { name, createdBy, states }) {
      const data = await LoginService.createTag(name, createdBy, states)
      state.username = data
    },

    async test({ state } ) {
      const data = await LoginService.getTags()
      state.username = data
    },

    async createTypeCategory({ state }, name) {
      const data = await LoginService.createTypeCategory(name)
      state.username = data
    },

    async getTypeCategory({ state }) {
      const data = await LoginService.getTypeCategory()
      state.username = data
    },

    async createBill({ state }) {
      const data = await LoginService.createBill()
      state.data = data
    },

    async getBill({ state }) {
      const data = await LoginService.getBill()
      state.data = data
    },

    async updateBill () {
      await LoginService.updateBill()
    }
  },

  mutations: {

  }
}

export default login
