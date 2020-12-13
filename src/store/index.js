import { createStore } from 'vuex'
import product from './product'
import auth from './auth'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    product,
    auth
  }
})
