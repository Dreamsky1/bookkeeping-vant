import { CategoryService } from '../../service'
import util from '@/lib/util'

const category = {
  namespaced: true,

  state: {
    categories: [],
    activeCategoryId: 0,
    activeParentCategory: {
      secondCategories: []
    }
  },

  actions: {
    async getCategories({ state }) {
      const data = await CategoryService.getCategories()
      state.categories = data.lists
      state.activeParentCategory = state.categories[0]
    },

    async createCategory({ state }, data) {
      console.log(state.categories)
      await CategoryService.createCategory(data)
    }
  },

  getters: {
    flexCategories(state) {
      state.categories.forEach((category) => {
        category.flexCategories = util.flexDatas(category.secondCategories, 3)
      })
    },

    filtersCategory(state, typeId) {
      return state.categories.filter((item) => item.id === typeId)
    }

  },

  mutations: {
    updateActiveCategoryId (state, id) {
      state.activeCategoryId = id
    },

    updateActiveParentCategory (state, item) {
      state.activeParentCategory = item
    }
  }
}

export default category
