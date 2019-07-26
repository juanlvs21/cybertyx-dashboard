const login = {
    state: {
        loadingMensajes: true,
        user: {
            user: '',
            name: '',
            profile: '',
            uptime: '',
            bytesIn: '',
            bytesOut: '',
            packetsIn: '',
            packetsOut: '',
            dynamic: '',
            disabled: '',
        },
        errorLogin: {
            error: false,
            message: '',
        }
    },
    mutations: {
        toogleDestino(state, destino) {
            if (destino == 'admin') {
                state.destinatario = 'admin'
            } else if (destino == 'soport') {
                state.destinatario = 'soport'
            }
        },
        toogleLoadingMsg(state) {
            state.loadingMensajes = !state.loadingMensajes
        },
        login(state, user) {
            state.user = user
        },
        errorLogin(state, { error, message }) {
            state.errorLogin.error = error
            state.errorLogin.message = message
        }
    },
    actions: {
        async login(context, payload) {
            const query = await this.$axios.$post('http://localhost:3001/api/v1/session/login', payload)

            if (query.error) {
                context.commit('errorLogin', { error: true, message: query.data })
            } else {
                context.commit('login', { error: false, message: query.data })
            }
        }
    }
}

export default login