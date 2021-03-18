import {
    createPromotion,
    getPromotions,
    getPromotionById,
    deletePromotion,
    updatePromotion,
} from '../database/promotion'
const state = () => ({
    tab: [],
    promotion: null,
})

// getters
const getters = {}

// actions
const actions = {
    addPromotion: async function ({ commit }, payload) {
        var result = await createPromotion(payload)
        commit('addPromotion', result)
    },
    getPromotions: async function ({ commit }) {
        var result = await getPromotions()
        commit('setPromotions', result)
    },
    getPromotionById: async function ({ commit }, payload) {
        var result = await getPromotionById(payload)
        commit('setPromotion', result)
    },
    updatePromotion: async function ({ commit }, payload) {
        await updatePromotion(payload)
        commit('updatePromotion', payload)
    },
    deletePromotion: async function ({ commit }, payload) {
        await deletePromotion(payload.promotionId)
        commit('deletePromotion', payload)
    },
}

// mutations
const mutations = {
    addPromotion: function (state, payload) {
        state.tab.push(payload)
    },
    setPromotions: function (state, payload) {
        state.tab = payload
    },
    deletePromotion: function (state, payload) {
        state.tab.splice(
            state.tab.indexOf((params) => {
                return params.promotionId === payload.promotionId
            })
        )
    },
    setPromotion: function (state, payload) {
        state.promotion = payload
    },
    updatePromotion: function (state, payload) {
        state.tab[
            state.tab.findIndex((params) => {
                return params.promotionId === payload.promotionId
            })
        ] = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
