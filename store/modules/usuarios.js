import URL_API from '../config/config'

const usuarios = {
    state: {
        users: [],
    },
    mutations: {
        mutateUsers(state, users) {
            state.users = users
        },
    },
    actions: {
        async actionGetUsers({ commit }) {
            const query = await this.$axios.$get(`${URL_API}/api/v1/users`)
            commit('mutateUsers', query.data)
        },
    }
}

export default usuarios