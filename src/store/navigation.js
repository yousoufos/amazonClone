const state = () => ({
    from: [],
})

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    reset(state) {
        state.form = []
    },
    setFrom(state, payload) {
        state.from.push(payload)
    },
    removeFrom(state) {
        state.from.pop()
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
