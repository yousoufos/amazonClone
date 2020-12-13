import { auth } from '../firebase'
import router from '../router'
// initial state
const state = () => ({ user: null, test: 'test' })

// getters
const getters = {
    user: function (state) {
        return state.user
    },
}

// actions
const actions = {
    register: function ({ commit }, payload) {
        auth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then((auth) => {
                if (auth) {
                    router.push('/')
                }
            })
            .catch((err) => alert(err))
    },
    login: function ({ commit }, payload) {
        auth.signInWithEmailAndPassword(payload.email, payload.password)
            .then((auth) => {
                if (auth) {
                    router.go(-1)
                }
            })
            .catch((err) => alert(err))
    },
    logout: function ({ commit }) {
        auth.signOut()
        commit('setUser', null)
        router
            .push('/')
            .then(() => {})
            .catch((err) => alert(err))
    },
}

// mutations
const mutations = {
    setUser: (state, payload) => (state.user = payload),
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
