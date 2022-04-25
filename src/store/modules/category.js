import { CategoryService } from '../../service'

const category = {
  namespaced: true,

  state: {
    categories: []
  },

  actions: {
    async getCategories({ state }) {
      const data = await CategoryService.getCategories()
      state.categories = data.lists
    }
  },

  getters: {

  },

  mutations: {

  }
}

export default category
