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
  updateProductStock,
  updateProductRating,
  getCategorieProduct,
  updateProductPromotion
} from '../database/product'
import { updateOrderItems } from '../database/order'
import store from '@/store'
import { db } from '../firebase'
// initial state
const state = () => ({
  product: null,
  tab: [],
  productCategories: null,
  resultSearch: null,
  categorieProducts: null
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
    store.commit('navigation/setLoading', true)
    try {
      const snapshot = await getProducts()
      for (const doc of snapshot.docs) {
        const obj = {
          ...doc.data(),
          productId: doc.id,
          categories: await getProductCategories(doc.id)
        }

        commit('addProductToTab', obj)
      }
      store.commit('navigation/setLoading', false)
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

        commit('setProduct', { ...Obj, productId: product.id })
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
  getCategorieProduct: async function ({ commit }, categoryId) {
    try {
      const cat = await getCategorieProduct(categoryId)
      commit('setCategorieProducts', cat)
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
      commit('addProductToTab', {
        ...payload.product,
        categories: payload.productCategory.categories,
        productId: payload.productCategory.productId
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
      const orders = store.state.order.orders
      orders.forEach((element) => {
        const tab = element.items
        tab.forEach((params) => {
          if (params.productId === productId) {
            tab[tab.indexOf(params)].defaultPicture = ''
          }
          updateOrderItems({ orderId: element.orderId, items: tab })
        })
      })
      await removeProduct(productId)
      await updateAlgolia()
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
    commit('updateProduct', {
      ...payload.product,
      categories: payload.productCategory.categories,
      productId: payload.productId
    })
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
    const orders = store.state.order.orders
    orders.forEach((element) => {
      const tab = element.items
      tab.forEach((params) => {
        if (params.productId === payload.productId) {
          if (
            tab[tab.indexOf(params)].defaultPicture !==
                        payload.defaultPicture
          ) {
            tab[tab.indexOf(params)].defaultPicture = ''
          }
        }
        updateOrderItems({ orderId: element.orderId, items: tab })
      })
    })
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
  },
  updateProductRating: async function ({ commit }, payload) {
    await updateProductRating(payload)
    commit('setProductRating', payload)
  },
  updateProductPromotion: async function ({ commit }, payload) {
    await updateProductPromotion(payload)
    commit('setProductPromotion', payload)
  }
}

// mutations
const mutations = {
  setProductRating: function (state, payload) {
    if (state.tab !== null) {
      state.tab.find((product) => {
        return product.productId === payload.productId
      }).rating = payload.rating
      state.tab.find((product) => {
        return product.productId === payload.productId
      }).reviewNumber++
    }
  },
  setProductPromotion: function (state, payload) {
    if (state.tab !== null) {
      state.tab.find((product) => {
        return product.productId === payload.productId
      }).promotion = payload.promotion
    }
  },
  setProductStock: function (state, payload) {
    state.product.stock = payload.stock
  },
  setResultSearch: function (state, payload) {
    state.resultSearch = payload
  },
  setProductPictures: function (state, payload) {
    state.product.pictures = payload.pictures
    state.product.defaultPicture = payload.defaultPicture
  },
  updateProduct: function (state, payload) {
    state.tab[
      state.tab.findIndex((params) => {
        return params.productId === payload.productId
      })
    ] = payload
  },
  addProductToTab: function (state, payload) {
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
  setCategorieProducts: function (state, payload) {
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
