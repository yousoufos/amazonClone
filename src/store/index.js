import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import product from './product'
import auth from './auth'
import cart from './cart'
import order from './order'
import category from './category'
import notification from './notification'
import review from './review'
import navigation from './navigation'
import promotion from './promotion'

export default createStore({
    plugins: [
        /* createPersistedState({
      paths: ['navigation.test'],
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 3, secure: false }),
        removeItem: (key) => Cookies.remove(key)
      }
    }) */
    ],
    state: {},
    mutations: {},
    actions: {},
    modules: {
        product,
        auth,
        cart,
        order,
        review,
        notification,
        category,
        navigation,
        promotion,
    },
})
