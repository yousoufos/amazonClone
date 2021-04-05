const state = () => ({
    from: [],
    loading: true,
    prodcutsPagination: null,
    categoriesPagination: null,
    ordersPaginations: null,
    usersPagination: null,
    searchPagination: null,
    promotionPagination: null,
})

// getters
const getters = {
    getProductsPagination(state) {
        return state.prodcutsPagination
    },
    getUsersPagination(state) {
        return state.usersPagination
    },
    getOrdersPagination(state) {
        return state.ordersPagination
    },
    getCategoriesPagination(state) {
        return state.categoriesPagination
    },
    getSearchPagination(state) {
        return state.searchPagination
    },
    getPromotionPagination(state) {
        return state.promotionPagination
    },
}

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
        state.loading = payload
    },
    setProductsPagination(state, payload) {
        state.prodcutsPagination = payload
    },
    setOrdersPagination(state, payload) {
        state.ordersPagination = payload
    },
    setUsersPagination(state, payload) {
        state.usersPagination = payload
    },
    setCategoriesPagination(state, payload) {
        state.categoriesPagination = payload
    },
    setSearchPagination(state, payload) {
        state.searchPagination = payload
    },
    setPromotionPagination(state, payload) {
        state.promotionPagination = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
