import { CategoryService } from '../../service'
import util from '@/lib/util'

const category = {
  namespaced: true,

  state: {
    categories: [],
    activeCategoryId: 0,
    activeParentCategory: {
      secondCategories: []
    },

    categoryIds: [{
      name: '支出',
      id: 1
    }, {
      name: '收入',
      id: 2
    }] // 默认支出和收入的 ID分别是 1, 2
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

    updateActiveParentCategory (state, index) {
      state.activeParentCategory = state.categories[index]
    }
  }
}

export default category
