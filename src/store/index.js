import { createStore } from 'vuex'
import product from './product'
import auth from './auth'
import cart from './cart'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    product,
    auth,
    cart
  }
})
