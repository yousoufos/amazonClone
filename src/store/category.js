import {
  getCategories,
  updateCategory,
  deleteCategory
} from '../database/category'

// initial state
const state = () => ({ categories: null, productCategories: null })

// getters
const getters = {}

// actions
const actions = {
  getCategories: async function ({ commit }) {
    const cat = await getCategories()

    commit('setCategories', cat)
  },
  setCategories: function ({ commit }, payload) {
    commit('setCategories', payload)
  },
  updateCategory: async function ({ commit }, payload) {
    await updateCategory(payload)

    commit('setCategories', payload.categories)
  },
  deleteCategory: async function ({ commit }, payload) {
    await deleteCategory(payload.categoryId)

    commit('deleteCategory', payload.categoryId)
  }
}

// mutations
const mutations = {
  setCategories: function (state, payload) {
    state.categories = payload
  },
  deleteCategory: function (state, payload) {
    state.categories.splice(
      state.categories.findIndex((e) => e.id === payload),
      1
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
