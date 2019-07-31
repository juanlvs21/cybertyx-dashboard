import URL_API from '../config/config'

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
        mutateLogin(state, user) {
            state.user = user
            state.authUser = true
            state.errorLogin.error = false
            state.errorLogin.message = ''
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
            const user = {
                user: payload.user,
                password: btoa(payload.password),
            }
            try {
                const query = await this.$axios.$post(`${URL_API}/api/v1/session/login`, user)
                if (query.error) {
                    commit('mutateLoginError', { error: true, message: query.data })
                } else {
                    commit('mutateLogin', query.data)
                }
            } catch (error) {
                commit('mutateLoginError', { error: true, message: 'Error desconocido' })
            }
        },
        actionLoginClearError({ commit }) {
            commit('mutateLoginError', { error: false, message: '' })
        },
    }
}

export default login