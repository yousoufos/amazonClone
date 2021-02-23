const state = () => ({
    from: [],
    loading: true,
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
    setLoading(state, payload) {
        console.log(payload)
        state.loading = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
