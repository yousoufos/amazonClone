import {
  createPromotion,
  getPromotions,
  getPromotionById,
  deletePromotion,
  updatePromotion
} from '../database/promotion'
import store from '@/store'
const state = () => ({
  tab: [],
  promotion: null,
  checkProductInPromotion: null
})

// getters
const getters = {
  getCheckProductInPromotion (state) {
    return state.checkProductInPromotion
  }
}

// actions
const actions = {
  addPromotion: async function ({ commit }, payload) {
    const result = await createPromotion(payload)
    for (const doc of payload.productsList) {
      await store.dispatch('product/updateProductPromotion', {
        productId: doc.productId,
        promotion: {
          promotionId: result.promotionId,
          newPrice: doc.newPrice
        }
      })
    }
    commit('addPromotion', result)
  },
  getPromotions: async function ({ commit }) {
    const result = await getPromotions()
    commit('setPromotions', result)
  },
  getPromotionById: async function ({ commit }, payload) {
    const result = await getPromotionById(payload)
    commit('setPromotion', result)
  },
  updatePromotion: async function ({ commit }, payload) {
    await updatePromotion(payload)
    for (const doc of payload.productsList) {
      await store.dispatch('product/updateProductPromotion', {
        productId: doc.productId,
        promotion: {
          promotionId: payload.promotionId,
          newPrice: doc.newPrice
        }
      })
    }
    commit('updatePromotion', payload)
  },
  deletePromotion: async function ({ commit }, payload) {
    await deletePromotion(payload.promotionId)
    for (const doc of payload.productsList) {
      await store.dispatch('product/updateProductPromotion', {
        productId: doc.productId,
        promotion: null
      })
    }
    commit('deletePromotion', payload)
  },
  checkProductInPromotion: async function ({ commit, state }, payload) {
    let i = 0
    commit('setCheckProductInPromotion', null)
    state.tab.forEach((promotion) => {
      promotion.productsList.forEach((product) => {
        if (product.productId === payload.productId && i === 0) {
          commit('setCheckProductInPromotion', promotion)
          i++
        }
      })
    })
  }
}

// mutations
const mutations = {
  addPromotion: function (state, payload) {
    state.tab.push(payload)
  },
  setPromotions: function (state, payload) {
    state.tab = payload
  },
  deletePromotion: function (state, payload) {
    state.tab.splice(
      state.tab.indexOf((params) => {
        return params.promotionId === payload.promotionId
      })
    )
  },
  setPromotion: function (state, payload) {
    state.promotion = payload
  },
  updatePromotion: function (state, payload) {
    state.tab[
      state.tab.findIndex((params) => {
        return params.promotionId === payload.promotionId
      })
    ] = payload
  },
  setCheckProductInPromotion: function (state, payload) {
    state.checkProductInPromotion = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
