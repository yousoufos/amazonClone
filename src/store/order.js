import router from '../router'
import store from '@/store'
import { addOrder, getOrder } from '../database/order'

// initial state
const state = () => ({ order: null })

// getters
const getters = {}

// actions
const actions = {
  addOrder: async function ({ commit, state }, payload) {
    await addOrder(payload)
    await store.dispatch('cart/emptyCart')

    router.push('/')
  },
  getOrder: async function ({ commit, rootState, state }) {
    const orders = await getOrder(rootState.auth.user.uid)

    commit('setOrders', orders)
    console.log(state.order)
  }
}

// mutations
const mutations = {
  setOrders: function (state, payload) {
    state.order = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
