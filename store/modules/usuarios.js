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
        async actionAddUser({ commit }, user) {
            console.log(user)
            const query = await this.$axios.$post(`${URL_API}/api/v1/users`, user)
        },
        async actionGetUsers({ commit }) {
            const query = await this.$axios.$get(`${URL_API}/api/v1/users`)
            commit('mutateUsers', query.data)
        },
        async actionUpdateUser({ commit }, user) {
            const query = await this.$axios.$put(`${URL_API}/api/v1/users`, user)
            commit('mutateRegisterName', query.data)
        },
        async actionDisableUser({ commit }, id) {
            const query = await this.$axios.$post(`${URL_API}/api/v1/users/disable`, { id })
        },
        async actionEnableUser({ commit }, id) {
            const query = await this.$axios.$post(`${URL_API}/api/v1/users/enable`, { id })
        },
        async actionTypeAdminUser({ commit }, id) {
            const query = await this.$axios.$post(`${URL_API}/api/v1/users/type/admin`, { id })
        },
        async actionTypeDefaultUser({ commit }, id) {
            const query = await this.$axios.$post(`${URL_API}/api/v1/users/type/default`, { id })
        },
        async actionDeleteUser({ commit }, id) {
            const query = await this.$axios.$post(`${URL_API}/api/v1/users/delete`, { id })
        },
    }
}

export default usuarios