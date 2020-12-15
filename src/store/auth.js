import { auth } from '../firebase'
import router from '../router'
import store from '@/store'
import { register, login } from '../database/user'

// initial state
const state = () => ({ user: null, test: 'test' })

// getters
const getters = {
  user: function (state) {
    return state.user
  }
}

// actions
const actions = {
  register: async function ({ commit }, payload) {
    const authi = await register(payload)
    if (authi) {
      store.dispatch('cart/initializeCart', authi.user.uid)
      router.push('/')
    }
  },
  login: async function ({ commit }, payload) {
    const user = await login(payload)
    if (user) {
      router.go(-1)
    }
  },
  logout: function ({ commit }) {
    auth.signOut()
    commit('setUser', null)
    store.dispatch('cart/emptyCart')
    router
      .push('/')
      .then(() => {})
      .catch((err) => alert(err))
  }
}

// mutations
const mutations = {
  setUser: (state, payload) => (state.user = payload)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
