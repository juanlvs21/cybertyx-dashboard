import URL_API from '../config/config'

const planes = {
    state: {
        plans: {
            id: '',
            data: '',
            duration: '',
            cost: 0,
            dolartoday: 0,
        },
        plansEmpty: {
            empty: false,
            message: '',
        },
    },
    mutations: {
        mutatePlans(state, plans) {
            state.plans = plans
            state.plansEmpty.empty = false
            state.plansEmpty.message = ''
        },
        mutateEmpty(state, emptyMessage) {
            state.plansEmpty.empty = true
            state.plansEmpty.message = emptyMessage
        }
    },
    actions: {
        async actionNuevoPlan({ commit }, payload) {
            const query = await this.$axios.$post(`${URL_API}/api/v1/plans`, payload)
        },
        async actionGetPlans({ commit }) {
            const query = await this.$axios.$get(`${URL_API}/api/v1/plans`)
            if (query.empty) {
                commit('mutateEmpty', query.data)
            } else {
                commit('mutatePlans', query.data)
            }
        },
        async actionDeletePlan({ commit }, payload) {
            const query = await this.$axios.$delete(`${URL_API}/api/v1/plans/${payload}`)
        },
    }
}

export default planes