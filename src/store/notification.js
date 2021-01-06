const state = () => ({
  notification: null
})

// getters
const getters = {}

// actions
const actions = {
  setNotification: function ({ commit }, payload) {
    commit('setNotification', payload)
  }
}

// mutations
const mutations = {
  setNotification (state, payload) {
    state.notification = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
