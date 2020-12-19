import { auth } from '../firebase'
import router from '../router'
import store from '@/store'
import { register, login, updateUser } from '../database/user'
import { getUser } from '../database/cart'

// initial state
const state = () => ({ user: null })

// getters
const getters = {
  user: function (state) {
    return state.user
  }
}

// actions
const actions = {
  register: async function ({ commit }, payload) {
    const authi = await register(payload)
    if (authi) {
      store.dispatch('cart/initializeCart', { userId: authi.user.uid })
      router.push('/')
    }
  },
  login: async function ({ commit }, payload) {
    const user = await login(payload)
    if (user) {
      router.go(-1)
    }
  },
  logout: async function ({ commit }) {
    await auth.signOut()
    commit('setUser', null)
    store.dispatch('cart/refreshCart')
    router
      .push('/')
      .then(() => {})
      .catch((err) => alert(err))
  },
  getUserDetails: async function ({ commit }, payload) {
    try {
      const data = await getUser(payload)
      if (data.exists) {
        commit('addUserDetails', {
          nom: data.data().nom,
          prenom: data.data().prenom,
          adresse: data.data().adresse,
          telephone: data.data().telephone
        })
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    } catch (error) {}
  },
  updateUser: async function ({ commit, state }, payload) {
    try {
      await updateUser(state.user.uid, payload)
      commit('addUserDetails', payload)
    } catch (error) {
      console.log(error)
    }
  }
}

// mutations
const mutations = {
  setUser: (state, payload) => (state.user = payload),
  addUserDetails: function (state, payload) {
    state.user.nom = payload.nom
    state.user.prenom = payload.prenom
    state.user.adresse = payload.adresse
    state.user.telephone = payload.telephone
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
