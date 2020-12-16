import router from '../router'
import 'firebase/firestore'

import {
  initializeCart,
  getUser,
  addToCart,
  updateItemsCart
} from '../database/cart'
// initial state
const state = () => ({ cart: [] })

// getters
const getters = {
  total: function (state) {
    return state.cart.reduce((a, b) => a + b.price * b.qte, 0)
  }
}

// actions
const actions = {
  initializeCart: async function ({ commit }, payload) {
    await initializeCart(payload.userId)
  },
  getUserCart: async function ({ commit }, payload) {
    try {
      commit('emptyCart')
      const data = await getUser(payload)
      if (data.exists) {
        data.data().cart.items.forEach((element) => {
          commit('addToCart', {
            productId: element.productId,
            picture: element.picture,
            title: element.title,
            description: element.description,
            price: element.price,
            qte: element.qte,
            rating: element.rating
          })
        })
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    } catch (error) {
      console.log(error)
    }
  },
  addToCart: async function ({ commit, state, rootState, getters }, payload) {
    if (rootState.auth.user) {
      if (
        state.cart.findIndex(
          (el) => el.productId === payload.productId
        ) === -1
      ) {
        const product = {
          productId: payload.productId,
          title: payload.title,
          description: payload.description,
          price: payload.price,
          picture: payload.picture,
          rating: payload.rating,
          qte: 1
        }
        commit('addToCart', product)
        try {
          await addToCart(
            rootState.auth.user.uid,
            product,
            getters.total
          )
        } catch (error) {
          console.log(error)
        }
      } else {
        alert('Product already in cart')
      }
    } else {
      router.push('/login')
    }
  },
  removeFromCart: async function (
    { commit, state, rootState, getters },
    payload
  ) {
    commit('removeFromCart', payload.productId)
    await updateItemsCart(rootState.auth.user.uid, {
      oldItems: state.cart,
      total: getters.total
    })
  },
  emptyCart: function ({ commit }) {
    commit('emptyCart')
  },
  updateQuantity: async function ({ commit, rootState }, payload) {
    const data = await getUser(rootState.auth.user.uid)
    const oldItems = data.data().cart.items
    oldItems.find((el) => el.productId === payload.productId).qte =
            payload.qte
    await updateItemsCart(rootState.auth.user.uid, {
      oldItems,
      total: payload.total
    })
  }
}

// mutations
const mutations = {
  addToCart: function (state, payload) {
    state.cart.push(payload)
  },
  emptyCart: function (state, payload) {
    state.cart = []
  },
  removeFromCart: function (state, payload) {
    state.cart.splice(
      state.cart.findIndex((el) => el.productId === payload),
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
