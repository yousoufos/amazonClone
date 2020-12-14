import router from '../router'
import { db } from '../firebase'
// initial state
const state = () => ({
  tab: [
    // {
    //   id: '1',
    //   title: 'Iphone 12',
    //   price: 1500,
    //   description: 'Lorem Ipsum is simply dummy text of the printing .',
    //   picture: 'iphone12.jpg',
    //   rating: 5
    // },
    // {
    //   id: '2',
    //   title: 'Imprimante Multifonction',
    //   price: 1500,
    //   description: 'Lorem Ipsum is simply dummy text of the printing .',
    //   picture: 'imprimate.jpg',
    //   rating: 2
    // },
    // {
    //   id: '3',
    //   title: 'Claveir mecanique',
    //   price: 1500,
    //   description: 'Lorem Ipsum is simply dummy text of the printing .',
    //   picture: 'clavier.jpg',
    //   rating: 3
    // }
  ]
})

// getters
const getters = {}

// actions
const actions = {
  getProducts: async function ({ commit }) {
    commit('emptyProductArray')
    const products = db.collection('product').limit(3)
    try {
      const snapshot = await products.get()
      snapshot.forEach((doc) => {
        const obj = {
          productId: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          price: doc.data().price,
          rating: doc.data().rating,
          picture: doc.data().picture
        }
        commit('addProducts', obj)
      })
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
