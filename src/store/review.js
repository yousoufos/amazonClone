import {
  addReview,
  getProductReviews,
  getUserReviews
} from '../database/review'
import { getUserById } from '../database/user'
import moment from 'moment'
const state = () => ({ productReviews: null, userReviews: null })
const getters = {}
const actions = {
  addReview: async function ({ commit }, payload) {
    await addReview(payload)
    commit('addReviewUser', {
      ...payload,
      date: moment().format('LL')
    })
  },
  getProductReviews: async function ({ commit }, payload) {
    const result = await getProductReviews(payload)
    const tab = []
    for (const doc of result.docs) {
      const user = await getUserById(doc.data().userId)

      tab.push({
        reviewId: doc.id,
        productId: doc.data().productId,
        user: user.data(),
        message: doc.data().message,
        title: doc.data().title,
        rating: Number(doc.data().rating),
        date: moment(doc.data().date.toDate()).format('LL')
      })
    }
    commit('setProductReview', tab)
  },
  getUserReviews: async function ({ commit }, payload) {
    const result = await getUserReviews(payload)
    const tab = []
    result.forEach((doc) => {
      tab.push({
        reviewId: doc.id,
        productId: doc.data().productId,
        userId: doc.data().userId,
        message: doc.data().message,
        title: doc.data().title,
        rating: Number(doc.data().rating),
        date: moment(doc.data().date.toDate()).format('LL')
      })
    })
    commit('setUserReview', tab)
  }
}
const mutations = {
  setProductReview: function (state, payload) {
    state.productReviews = payload
  },
  setUserReview: function (state, payload) {
    state.userReviews = payload
  },
  addReviewUser: function (state, payload) {
    state.userReviews.push(payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
