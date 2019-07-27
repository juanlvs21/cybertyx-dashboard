const login = {
    state: {
        user: {
            user: '',
            name: '',
            profile: '',
            uptime: '',
            bytesIn: 0,
            bytesOut: 0,
            packetsIn: 0,
            packetsOut: 0,
            dynamic: '',
            disabled: '',
        },
        errorLogin: {
            error: false,
            message: '',
        },
        authUser: false,
    },
    mutations: {
        mutateLogin(state, { user }) {
            state.user = user
            state.authUser = true
            console.log(state.user)
        },
        mutateLoginError(state, { error, message }) {
            state.errorLogin.error = error
            state.errorLogin.message = message
        },
        mutateLogout(state, router) {
            state.user.user = ''
            state.user.name = ''
            state.user.profile = ''
            state.user.uptime = ''
            state.user.bytesIn = 0
            state.user.bytesOut = 0
            state.user.packetsIn = 0
            state.user.packetsOut = 0
            state.user.dynamic = ''
            state.user.disabled = ''
            router.push('/login')
        },
    },
    actions: {
        async actionLogin({ commit }, payload) {
            payload.password = btoa(payload.password) // Ciframos los datos para que viajen por http
            const query = await this.$axios.$post('http://localhost:3001/api/v1/session/login', payload)
            if (query.error) {
                commit('mutateLoginError', { error: true, message: query.data })
            } else {
                commit('mutateLogin', { user: query.data })
            }
        },
        actionLoginClearError({ commit }) {
            commit('mutateLoginError', { error: false, message: '' })
        },
    }
}

export default login