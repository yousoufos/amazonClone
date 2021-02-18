import { createStore } from 'vuex'
import product from './product'
import auth from './auth'
import cart from './cart'
import order from './order'
import category from './category'
import notification from './notification'
import review from './review'
import navigation from './navigation'

export default createStore({
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
    },
})
