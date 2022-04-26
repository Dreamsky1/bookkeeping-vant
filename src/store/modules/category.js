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
      const time = state.activeParentCategory.secondCategories[0].created_on
      console.log('输出这个时间戳转为标准时间', new Date(time * 1000).getTime())
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
