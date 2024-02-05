export const state = () => ({
    isAuth: false
})

export const getters = {
    getAuth(state) {
        return state.isAuth
    }
}

export const mutations = {
    setAuth(state, val) {
        state.isAuth = val
    }
}

export const actions = {
    nuxtServerInit({ state }, ctx) {
        state.isAuth = !!this.$cookies.get('inforphere_access_token')
    }
}