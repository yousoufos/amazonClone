import { getCategories } from '../database/category'
import { db } from '../firebase'

// initial state
const state = () => ({ categories: null, productCategories: null })

// getters
const getters = {}

// actions
const actions = {
  getCategories: async function ({ commit }) {
    const cat = await getCategories()

    commit('setCategories', cat)
  }
}

// mutations
const mutations = {
  setCategories: function (state, payload) {
    state.categories = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
