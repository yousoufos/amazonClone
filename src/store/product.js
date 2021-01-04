import { getProducts, getProductById, createProduct } from '../database/product'
// initial state
const state = () => ({
  product: null
})

// getters
const getters = {}

// actions
const actions = {
  getProducts: async function ({ commit }) {
    commit('emptyProductArray')
    try {
      const snapshot = await getProducts()
      snapshot.forEach((doc) => {
        const obj = {
          productId: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          price: doc.data().price,
          rating: doc.data().rating,
          pictures: doc.data().pictures,
          defaultPicture: doc.data().defaultPicture
        }
        commit('addProducts', obj)
      })
    } catch (error) {
      console.log(error)
    }
  },
  getProductById: async function ({ commit }, productId) {
    try {
      const product = await getProductById(productId)
      if (product.exists) {
        commit('setProduct', {
          productId: product.id,
          data: product.data()
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  createProduct: async function ({ commit }, payload) {
    try {
      await createProduct(payload)
    } catch (error) {
      console.log(error)
    }
  }
}

// mutations
const mutations = {
  addProducts: function (state, payload) {
    state.tab.push(payload)
  },
  emptyProductArray: function (state) {
    state.tab = []
  },
  setProduct: function (state, payload) {
    state.product = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
