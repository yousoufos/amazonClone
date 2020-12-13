import router from '../router'
import { db } from '../firebase'
// initial state
const state = () => ({
    tab: [
        {
            id: '1',
            title: 'Iphone 12',
            price: 1500,
            description: 'Lorem Ipsum is simply dummy text of the printing .',
            picture: 'iphone12.jpg',
            rating: 5,
        },
        {
            id: '2',
            title: 'Imprimante Multifonction',
            price: 1500,
            description: 'Lorem Ipsum is simply dummy text of the printing .',
            picture: 'imprimate.jpg',
            rating: 2,
        },
        {
            id: '3',
            title: 'Claveir mecanique',
            price: 1500,
            description: 'Lorem Ipsum is simply dummy text of the printing .',
            picture: 'clavier.jpg',
            rating: 3,
        },
    ],
    cart: [],
})

// getters
const getters = {
    total: function (state) {
        return state.cart.reduce((a, b) => a + b.price * b.qte, 0)
    },
}

// actions
const actions = {
    getProducts: async function ({ commit }) {
        const products = db.collection('product')
        try {
            const snapshot = await products.get()
            snapshot.forEach((doc) => {
                let obj = {
                    id: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    price: doc.data().price,
                    rating: doc.data().rating,
                    picture: doc.data().picture,
                }
                commit('addProducts', obj)
            })
        } catch (error) {
            console.log(error)
        }
    },
    addToCart: function ({ commit, state, rootState }, payload) {
        if (rootState.auth.user) {
            if (state.cart.findIndex((el) => el.id === payload.id) === -1) {
                const product = {
                    id: payload.id,
                    title: payload.title,
                    description: payload.description,
                    price: payload.price,
                    picture: payload.picture,
                    rating: payload.rating,
                    qte: 1,
                }
                commit('addToCart', product)
            } else {
                alert('Product already in cart')
            }
        } else {
            router.push('/login')
        }
    },
    removeFromCart: function ({ commit }, payload) {
        commit('removeFromCart', payload)
    },
}

// mutations
const mutations = {
    addToCart: function (state, payload) {
        state.cart = [...state.cart, payload]
    },
    removeFromCart: function (state, payload) {
        state.cart.splice(
            state.cart.findIndex((el) => el.id === payload),
            1
        )
    },
    addProducts: function (state, payload) {
        state.tab.push(payload)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
