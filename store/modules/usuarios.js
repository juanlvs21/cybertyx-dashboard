import URL_API from '../config/config'

const usuarios = {
    state: {
        users: [],
    },
    mutations: {
        mutateUsers(state, users) {
            state.users = users
        },
        mutateRegisterName(state, user) {
            state.user = user // state.user está en sesion.js
            this.$router.push('/')
        }
    },
    actions: {
        async actionGetUsers({ commit }) {
            const query = await this.$axios.$get(`${URL_API}/api/v1/users`)
            commit('mutateUsers', query.data)
        },
        async updateUser({ commit }, user) {
            const query = await this.$axios.$put(`${URL_API}/api/v1/users`, user)
            commit('mutateRegisterName', query.data)
        },
    }
}

export default usuarios