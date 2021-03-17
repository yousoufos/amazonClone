const state = () => ({
    tab: [],
})

// getters
const getters = {}

// actions
const actions = {
    addPromotion: function ({ commit }, payload) {
        commit('addPromotion', payload)
    },
    getPromotions: async function ({ commit }) {
        commit('setPromotions')
    },
    deletePromotion: async function ({ commit }, payload) {
        commit('deletePromotion', payload)
    },
}

// mutations
const mutations = {
    addPromotion: function (state, payload) {
        state.tab.push(payload)
    },
    setPromotions: function (state) {
        return state.tab
    },
    deletePromotion: function (state, payload) {
        //FIXME: changer name par ID
        state.tab.splice(
            state.tab.indexOf((params) => {
                return params.name === payload.name
            })
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
