import router from '../router'
import store from '@/store'
import { addOrder, getOrder, getOrderById } from '../database/order'

// initial state
const state = () => ({ orders: null, order: null })

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
  },
  getOrderById: async function ({ commit }, orderId) {
    try {
      const order = await getOrderById(orderId)
      if (order.exists) {
        commit('setOrder', {
          OrderId: order.id,
          data: order.data()
        })
      } else {
        commit('setOrder', { error: 'forbiden' })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// mutations
const mutations = {
  setOrders: function (state, payload) {
    state.orders = payload
  },
  setOrder: function (state, payload) {
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
