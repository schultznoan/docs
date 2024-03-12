import { jwtDecode } from "jwt-decode"

export const state = () => ({
    isAuth: false,
    link: '',
    count: 0
})

export const getters = {
    getAuth(state) {
        return state.isAuth
    },
    getLink (state) {
        return state.link
    },
    getCount (state) {
        return state.count
    }
}

export const mutations = {
    setAuth(state, val) {
        state.isAuth = val
    },
    setLink (state, val) {
        state.link = val
    },
    setCount (state, val) {
        state.count = val
    }
}

export const actions = {
    async nuxtServerInit({ state }, { req, $axios }) {
        state.isAuth = !!this.$cookies.get('inforphere_access_token')

        if (this.$cookies.get('inforphere_access_token')) {
            const jwt = jwtDecode(this.$cookies.get('inforphere_access_token'))

            state.link = jwt.link
        }
        console.log(req.url)
        try {
            const count = await $axios.get('https://inforsphere.com/api/document/count')

            state.count = +(count?.data || 0)
        } catch (err) {
            console.error(err)
        }
    }
}