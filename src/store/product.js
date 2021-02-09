import {
  getProducts,
  getProductById,
  createProduct,
  getProductCategories,
  removeProduct,
  updateProduct,
  updateProductPictures,
  updateAlgolia,
  searchProduct,
  updateProductStock
} from '../database/product'
import store from '@/store'
// initial state
const state = () => ({
  product: null,
  tab: [],
  productCategories: null,
  resultSearch: null
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
      await updateAlgolia()
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
  updateProduct: async function ({ commit }, payload) {
    await updateProduct(
      payload.productId,
      payload.productCategory,
      payload.product
    )
    await updateAlgolia()
    store.dispatch('notification/setNotification', {
      message: 'Product Updated',
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
  },
  updateProductPictures: async function ({ commit }, payload) {
    await updateProductPictures(payload)
  },
  updateAlgolia: async function () {
    await updateAlgolia()
  },
  searchProduct: async function ({ commit }, payload) {
    const search = await searchProduct(payload)

    commit('setResultSearch', search)
  },
  resetSearch: function ({ commit }) {
    commit('setResultSearch', null)
  },
  updateProductStock: async function ({ commit }, payload) {
    await updateProductStock(payload)
    commit('setProductStock', payload)
  }
}

// mutations
const mutations = {
  setProductStock: function (state, payload) {
    state.tab.find((product) => {
      return product.productId === payload.productId
    }).stock = payload.stock
  },
  setResultSearch: function (state, payload) {
    state.resultSearch = payload
  },
  setProductPictures: function (state, payload) {
    state.product.pictures = payload.pictures
    state.product.defaultPicture = payload.defaultPicture
  },
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
  },
  sortByStock: function (state, payload) {
    if (payload === 'DESC') {
      state.tab.sort((a, b) => {
        return b.stock - a.stock
      })
    }
    if (payload === 'ASC') {
      state.tab.sort((a, b) => {
        return a.stock - b.stock
      })
    }
  },
  sortByPrice: function (state, payload) {
    if (payload === 'DESC') {
      state.tab.sort((a, b) => {
        return b.price - a.price
      })
    }
    if (payload === 'ASC') {
      state.tab.sort((a, b) => {
        return a.price - b.price
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
