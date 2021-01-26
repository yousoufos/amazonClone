import router from '../router'
import store from '@/store'
import moment from 'moment'
import {
  updateOrderDeliveryStatus,
  updateOrderPaymentStatus,
  addOrder,
  getOrder,
  getOrderById,
  getOrders
} from '../database/order'

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
    const orders = await getOrder(rootState.auth.user.userId)

    commit('setOrders', orders)
  },
  getUserOrders: async function ({ commit }, payload) {
    const orders = await getOrder(payload)

    commit('setOrders', orders)
  },
  getOrderById: async function ({ commit }, orderId) {
    try {
      const order = await getOrderById(orderId)
      if (order.exists) {
        commit('setOrder', {
          orderId: order.id,
          userId: order.data().userId,
          date: moment(order.data().date).format('LL'),
          paymentMethod: order.data().paymentMethod,
          total: order.data().total,
          items: order.data().items,
          deliveryStatus: order.data().deliveryStatus,
          paymentStatus: order.data().paymentStatus,
          error: 'granted',
          deliveryDate:
                        order.data().deliveryDate != null
                          ? moment(order.data().deliveryDate.toDate()).format(
                              'LL'
                            )
                          : null,
          paymentDate:
                        order.data().paymentDate != null
                          ? moment(order.data().paymentDate.toDate()).format(
                              'LL'
                            )
                          : null
        })
      } else {
        commit('setOrder', { error: 'forbiden' })
      }
    } catch (error) {
      console.log(error)
    }
  },
  getOrders: async function ({ commit }) {
    const orders = await getOrders()
    commit('setOrders', orders)
  },
  updateOrderDeliveryStatus: async function ({ commit }, payload) {
    console.log(payload)
    await updateOrderDeliveryStatus(payload)
    commit('updateOrderDeliveryStatus', payload)
  },
  updateOrderPaymentStatus: async function ({ commit }, payload) {
    console.log(payload)
    await updateOrderPaymentStatus(payload)
    commit('updateOrderPaymentStatus', payload)
  },
  sortByPrice: function ({ commit }, payload) {
    commit('sortByPrice', payload)
  },
  sortByDate: function ({ commit }, payload) {
    commit('sortByDate', payload)
  }
}

// mutations
const mutations = {
  setOrders: function (state, payload) {
    state.orders = payload
  },
  setOrder: function (state, payload) {
    state.order = payload
  },
  updateOrderDeliveryStatus: function (state, payload) {
    if (state.orders != null) {
      state.orders[
        state.orders.findIndex((params) => {
          return params.orderId === payload.orderId
        })
      ].deliveryStatus = payload.deliveryStatus
      state.orders[
        state.orders.findIndex((params) => {
          return params.orderId === payload.orderId
        })
      ].deliveryDate = moment(payload.deliveryDate).format('LL')
    }
    if (state.order != null) {
      state.order.deliveryDate = moment(payload.deliveryDate).format('LL')
      state.order.deliveryStatus = payload.deliveryStatus
    }
  },
  updateOrderPaymentStatus: function (state, payload) {
    if (state.orders != null) {
      state.orders[
        state.orders.findIndex((params) => {
          return params.orderId === payload.orderId
        })
      ].paymentStatus = payload.paymentStatus
      state.orders[
        state.orders.findIndex((params) => {
          return params.orderId === payload.orderId
        })
      ].paymentDate = moment(payload.paymentDate).format('LL')
    }
    if (state.order != null) {
      state.order.paymentDate = moment(payload.paymentDate).format('LL')
      state.order.paymentStatus = payload.paymentStatus
    }
  },
  sortByPrice: function (state, payload) {
    if (payload === 'DESC') {
      state.orders.sort((a, b) => {
        return b.total - a.total
      })
    }
    if (payload === 'ASC') {
      state.orders.sort((a, b) => {
        return a.total - b.total
      })
    }
  },
  sortByDate: function (state, payload) {
    if (payload === 'DESC') {
      state.orders.sort((a, b) => {
        if (moment(a) > moment(b)) {
          return 1
        } else return -1
      })
    }
    if (payload === 'ASC') {
      state.orders.sort((a, b) => {
        if (moment(a.date) < moment(b.date)) {
          return -1
        } else return 1
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
