const state = () => ({
  tab: [],
  promotion: null
})
const findInTab = (payload, state) => {
  return state.tab.find((params) => {
    return params.name === payload
  })
}
// getters
const getters = {}

// actions
const actions = {
  addPromotion: function ({ commit }, payload) {
    commit('addPromotion', payload)
  },
  getPromotions: async function ({ commit }) {
    commit('setPromotions')
  },
  deletePromotion: async function ({ commit }, payload) {
    commit('deletePromotion', payload)
  },
  getPromotionById: async function ({ commit, state }, payload) {
    const promotion = findInTab(payload, state)
    commit('setPromotion', promotion)
  },
  updatePromotion: async function ({ commit }, payload) {
    commit('updatePromotion', payload)
  }
}

// mutations
const mutations = {
  addPromotion: function (state, payload) {
    state.tab.push(payload)
  },
  setPromotions: function (state) {
    return state.tab
  },
  deletePromotion: function (state, payload) {
    // FIXME: changer name par ID
    state.tab.splice(
      state.tab.indexOf((params) => {
        return params.name === payload.name
      })
    )
  },
  setPromotion: function (state, payload) {
    state.promotion = payload
  },
  updatePromotion: function (state, payload) {
    // FIXME: chnager par ID

    state.tab[
      state.tab.findIndex((params) => {
        return params.name === payload.name
      })
    ] = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
