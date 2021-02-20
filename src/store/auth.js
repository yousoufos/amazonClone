import { auth } from '../firebase'
import router from '../router'
import store from '@/store'

import {
    register,
    login,
    updateUser,
    getUsers,
    getUserById,
    reLogin,
    updatePassword,
} from '../database/user'
import { getUser } from '../database/cart'
import moment from 'moment'

// initial state
const state = () => ({ user: null, users: null, resultPwd: null })

// getters
const getters = {
    user: function (state) {
        return state.user
    },
    isAdmin: function (state) {
        if (state.user.role === 'admin') {
            return true
        } else {
            return false
        }
    },
}

// actions
const actions = {
    register: async function ({ commit }, payload) {
        const authi = await register(payload)
        if (authi != 'cnx error') {
            store.dispatch('cart/initializeCart', {
                userId: authi.user.uid,
                email: authi.user.email,
                role: 'user',
                createdAt: moment().format(),
            })
            router.push('/')
        } else {
            store.dispatch('notification/setNotification', {
                message: 'User already exist',
                type: 'error',
                show: true,
            })
            setTimeout(function () {
                store.dispatch('notification/setNotification', {
                    message: '',
                    type: '',
                    show: false,
                })
            }, 3000)
        }
    },
    login: async function ({ commit }, payload) {
        const user = await login(payload)
        if (user !== 'cnx error') {
            router.go(-1)
        } else {
            store.dispatch('notification/setNotification', {
                message: 'Verify login or password',
                type: 'error',
                show: true,
            })
            setTimeout(function () {
                store.dispatch('notification/setNotification', {
                    message: '',
                    type: '',
                    show: false,
                })
            }, 3000)
        }
    },
    reLogin: async function ({ commit }, payload) {
        const result = await reLogin(payload)

        commit('reLogin', result)
    },
    updatePassword: async function ({ commit }, payload) {
        await updatePassword(payload)
        store.dispatch('notification/setNotification', {
            message: 'Password Updated',
            type: 'success',
            show: true,
        })
        setTimeout(function () {
            store.dispatch('notification/setNotification', {
                message: '',
                type: '',
                show: false,
            })
        }, 3000)
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
                    telephone: data.data().telephone,
                    role: data.data().role,
                    email: data.data().email,
                    userId: data.data().userId,
                    createdAt: data.data().createdAt,
                })
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!')
            }
        } catch (error) {}
    },
    getUserById: async function ({ commit }, payload) {
        try {
            const result = await getUserById(payload)
            if (result.exists) {
                commit('setUser', result.data())
            }
        } catch (error) {
            console.log(error)
        }
    },
    updateUser: async function ({ commit, state }, payload) {
        try {
            await updateUser(state.user.userId, payload)
            commit('addUserDetails', payload)
        } catch (error) {
            console.log(error)
        }
    },
    getUsers: async function ({ commit }) {
        const users = await getUsers()
        commit('setUsers', users)
    },
}

// mutations
const mutations = {
    setUser: (state, payload) => {
        state.user = payload
    },
    addUserDetails: function (state, payload) {
        const entries = Object.entries(payload)

        entries.forEach(([key, val]) => {
            state.user[key] = val
        })
        /* state.user.nom = payload.nom
    state.user.prenom = payload.prenom
    state.user.adresse = payload.adresse
    state.user.telephone = payload.telephone */
    },
    setUsers: function (state, payload) {
        state.users = payload
    },
    reLogin: function (state, payload) {
        state.resultPwd = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
