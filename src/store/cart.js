import router from '../router'
import store from '@/store'
import 'firebase/firestore'

import {
    initializeCart,
    getUser,
    addToCart,
    updateItemsCart,
} from '../database/cart'
// initial state
const state = () => ({ cart: null, notification: null })

// getters
const getters = {
    total: function (state) {
        return state.cart.items.reduce((a, b) => a + b.price * b.qte, 0)
    },
}

// actions
const actions = {
    initializeCart: async function ({ commit }, payload) {
        await initializeCart(payload)
    },
    getUserCart: async function ({ commit }, payload) {
        const tab = []
        try {
            commit('emptyCart')
            const data = await getUser(payload)
            if (data.exists) {
                let car = {}
                data.data().cart.items.forEach((element) => {
                    tab.push({
                        productId: element.productId,
                        defaultPicture: element.defaultPicture,
                        title: element.title,
                        description: element.description,
                        price: element.price,
                        qte: element.qte,
                        rating: element.rating,
                    })
                })

                car = { items: tab, total: data.data().cart.total }

                commit('setCart', car)
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!1')
            }
        } catch (error) {
            console.log(error)
        }
    },
    addToCart: async function (
        { commit, state, rootState, getters, dispatch },
        payload
    ) {
        if (rootState.auth.user) {
            var f

            if (payload.productId) {
                f = state.cart.items.findIndex(
                    (el) => el.productId === payload.productId
                )
            } else {
                f = state.cart.items.findIndex(
                    (el) => el.productId === payload.objectID
                )
            }

            if (f === -1) {
                const product = {
                    productId: payload.productId
                        ? payload.productId
                        : payload.objectID,
                    title: payload.title,
                    description: payload.description,
                    price: payload.price,
                    defaultPicture: payload.defaultPicture,
                    rating: payload.rating,
                    qte: 1,
                }

                commit('addItemsToCart', product)
                store.dispatch('notification/setNotification', {
                    message: 'Product Added',
                    type: 'success',
                    show: true,
                })

                try {
                    await addToCart(
                        rootState.auth.user.userId,
                        product,
                        getters.total
                    )
                } catch (error) {
                    console.log(error)
                }
                setTimeout(function () {
                    store.dispatch('notification/setNotification', {
                        message: '',
                        type: '',
                        show: false,
                    })
                }, 3000)
            } else {
                alert('Product already in cart')
            }
        } else {
            router.push('/login')
        }
    },
    removeFromCart: async function (
        { commit, state, rootState, getters },
        payload
    ) {
        commit('removeFromCart', payload.productId)
        await updateItemsCart(rootState.auth.user.userId, {
            oldItems: state.cart.items,
            total: getters.total,
        })
    },
    refreshCart: function ({ commit }) {
        commit('emptyCart')
    },
    emptyCart: async function ({ commit, rootState }) {
        await updateItemsCart(rootState.auth.user.userId, {
            total: 0,
            oldItems: [],
        })
        commit('emptyCart')
    },
    updateQuantity: async function ({ commit, rootState }, payload) {
        const data = await getUser(rootState.auth.user.userId)
        const oldItems = data.data().cart.items
        oldItems.find((el) => el.productId === payload.productId).qte =
            payload.qte
        await updateItemsCart(rootState.auth.user.userId, {
            oldItems,
            total: payload.total,
        })
    },
}

// mutations
const mutations = {
    addItemsToCart: function (state, payload) {
        state.cart.items.push(payload)
    },
    setCart: function (state, payload) {
        state.cart = payload
    },
    emptyCart: function (state) {
        if (state.cart) {
            state.cart.items = []
            state.cart.total = 0
        }
    },
    removeFromCart: function (state, payload) {
        state.cart.items.splice(
            state.cart.items.findIndex((el) => el.productId === payload),
            1
        )
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
