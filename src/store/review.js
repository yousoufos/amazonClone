import {
  addReview,
  getProductReviews,
  getUserReviews
} from '../database/review'
const state = () => ({ productReview: null, userReviews: null })
const getters = {}
const actions = {
  addReview: async function ({ commit }, payload) {
    await addReview(payload)
  },
  getProductReviews: async function ({ commit }, payload) {
    const result = await getProductReviews(payload)
    const tab = []
    result.forEach((doc) => {
      tab.push({
        reviewId: doc.id,
        productId: doc.data.productId,
        userId: doc.data.userId,
        message: doc.data.message,
        rating: Number(doc.data.rating)
      })
    })
    commit('setProductReview', tab)
  },
  getUserReviews: async function ({ commit }, payload) {
    const result = await getUserReviews(payload)
    const tab = []
    result.forEach((doc) => {
      tab.push({
        reviewId: doc.id,
        productId: doc.data.productId,
        userId: doc.data.userId,
        message: doc.data.message,
        rating: Number(doc.data.rating)
      })
    })
    commit('setUserReview', tab)
  }
}
const mutations = {
  setProductReview: function (state, payload) {
    state.productReview = payload
  },
  setUserReview: function (state, payload) {
    state.userReview = payload
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
