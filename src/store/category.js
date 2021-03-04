import {
  getCategories,
  updateCategory,
  deleteCategory,
  addCategory,
  getCategorieById
} from '../database/category'

// initial state
const state = () => ({
  categories: null,
  productCategories: null,
  categorie: null
})

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
  },
  addCategory: async function ({ commit }, payload) {
    await addCategory(payload)

    commit('addCategory', {
      id: payload.ref.id,
      name: payload.name,
      editable: false,
      picture: payload.picture
    })
  },
  getCategorieById: async function ({ commit }, payload) {
    const result = await getCategorieById(payload)
    if (result.exists) {
      commit('setCategorie', {
        id: result.id,
        name: result.data().name,
        picture: result.data().picture
      })
    }
  }
}

// mutations
const mutations = {
  setCategorie: function (state, payload) {
    state.categorie = payload
  },
  setCategories: function (state, payload) {
    state.categories = payload
  },
  deleteCategory: function (state, payload) {
    state.categories.splice(
      state.categories.findIndex((e) => e.id === payload),
      1
    )
  },
  addCategory: function (state, payload) {
    state.categories.push(payload)
  },
  updatePicture: function (state, payload) {
    state.categories.find((params) => {
      return params.id === payload.id
    }).picture = payload.picture
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
