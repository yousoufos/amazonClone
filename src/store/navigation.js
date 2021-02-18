const state = () => ({
    from: null,
})

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    setFrom(state, payload) {
        state.from = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
