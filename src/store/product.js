import {
  getProducts,
  getProductById,
  createProduct,
  getProductCategories,
  removeProduct,
  updateProduct
} from '../database/product'
import store from '@/store'
// initial state
const state = () => ({
  product: null,
  tab: [],
  productCategories: null
})

// getters
const getters = {
  getProducts: function (state) {
    return state.product
  }
}

// actions
const actions = {
  getProducts: async function ({ commit }) {
    commit('emptyProductArray')
    try {
      const snapshot = await getProducts()
      for (const doc of snapshot.docs) {
        const obj = {
          productId: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          price: doc.data().price,
          rating: doc.data().rating,
          pictures: doc.data().pictures,
          stock: doc.data().stock,
          defaultPicture: doc.data().defaultPicture,
          categories: await getProductCategories(doc.id)
        }

        commit('addProducts', obj)
      }
    } catch (error) {
      console.log(error)
    }
  },
  getProductById: async function ({ commit }, productId) {
    try {
      let Obj = {}
      const product = await getProductById(productId)
      if (product.exists) {
        const cat = await getProductCategories(productId)

        Obj = Object.assign({}, product.data(), {
          categories: cat
        })

        commit('setProduct', {
          productId: product.id,
          data: Obj
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  getProductCategories: async function ({ commit }, productId) {
    try {
      const cat = await getProductCategories(productId)
      commit('setProductCategories', cat)
    } catch (error) {
      console.log(error)
    }
  },
  createProduct: async function ({ commit }, payload) {
    try {
      await createProduct(payload)
      store.dispatch('notification/setNotification', {
        message: 'Product created sucefully',
        type: 'success',
        show: true
      })
      setTimeout(function () {
        store.dispatch('notification/setNotification', {
          message: '',
          type: '',
          show: false
        })
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  },
  removeProduct: async function ({ commit }, productId) {
    try {
      await removeProduct(productId)
      commit('removeProduct', productId)
    } catch (error) {
      console.log(error)
    }
  },
  updateProduct: function ({ commit }, payload) {
    updateProduct(
      payload.productId,
      payload.productCategory,
      payload.product
    )
    console.log(payload)
    console.log('Update product ')
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
  },
  setProductCategories: function (state, payload) {
    state.productCategories = payload
  },
  removeProduct: function (state, payload) {
    state.tab.splice(
      state.tab.findIndex((product) => {
        return product.id === payload
      }),
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
