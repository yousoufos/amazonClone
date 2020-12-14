import { db } from '../firebase'
import router from '../router'
import 'firebase/firestore'
import firebase from 'firebase/app'
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
  initializeCart: async function ({ commit, rootState }, payload) {
    try {
      await db
        .collection('users')
        .doc(payload)
        .set({
          cart: { items: [], total: 0, createdAt: Date.now() }
        })
      console.log('cart initialized')
    } catch (error) {
      console.log(error)
    }
  },
  getUserCart: async function ({ commit }, payload) {
    try {
      commit('emptyCart')
      const data = await db.collection('users').doc(payload).get()
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
        await db
          .collection('users')
          .doc(rootState.auth.user.uid)
          .update({
            'cart.items': firebase.firestore.FieldValue.arrayUnion(
              product
            )
          })
        await db
          .collection('users')
          .doc(rootState.auth.user.uid)
          .update({
            'cart.total': getters.total
          })
      } else {
        alert('Product already in cart')
      }
    } else {
      router.push('/login')
    }
  },
  removeFromCart: function ({ commit, getters }, payload) {
    commit('removeFromCart', payload)
  },
  emptyCart: function ({ commit }) {
    commit('emptyCart')
  },
  updateQuantity: async function ({ commit, rootState }, payload) {
    console.log(payload)
    try {
      await db.collection('users').doc(rootState.auth.user.uid).update({
        'cart.total': payload
      })
    } catch (error) {
      console.log(error)
    }
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
      state.cart.findIndex((el) => el.id === payload),
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
