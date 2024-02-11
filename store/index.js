import { jwtDecode } from "jwt-decode"

export const state = () => ({
    isAuth: false,
    link: ''
})

export const getters = {
    getAuth(state) {
        return state.isAuth
    },
    getLink (state) {
        return state.link
    }
}

export const mutations = {
    setAuth(state, val) {
        state.isAuth = val
    },
    setLink (state, val) {
        state.link = val
    }
}

export const actions = {
    nuxtServerInit({ state }) {
        state.isAuth = !!this.$cookies.get('inforphere_access_token')

        if (this.$cookies.get('inforphere_access_token')) {
            const jwt = jwtDecode(this.$cookies.get('inforphere_access_token'))

            state.link = jwt.link
        }
    }
}