import URL_API from '../config/config'

const planes = {
    state: {
        plans: [],
        plansEmpty: {
            empty: false,
            message: '',
        },
        plansDolartodayError: {
            error: false,
            message: '',
        }
    },
    mutations: {
        mutatePlans(state, plans) {
            state.plans = plans

            state.plansEmpty.empty = false
            state.plansEmpty.message = ''

            state.plansDolartodayError.error = false
            state.plansDolartodayError.message = ''
        },
        mutateEmpty(state, emptyMessage) {
            state.plansEmpty.empty = true
            state.plansEmpty.message = emptyMessage

            state.plansDolartodayError.error = false
            state.plansDolartodayError.message = ''

        },
        mutateDolartodayError(state, { data, dolartodayError }) {
            state.plans = data

            state.plansEmpty.empty = false
            state.plansEmpty.message = ''

            state.plansDolartodayError.error = true
            state.plansDolartodayError.message = dolartodayError
        },
    },
    actions: {
        async actionNuevoPlan({ commit }, payload) {
            const query = await this.$axios.$post(`${URL_API}/api/v1/plans`, payload)
        },
        async actionUpdatePlan({ commit }, payload) {
            const query = await this.$axios.$put(`${URL_API}/api/v1/plans`, payload)
        },
        async actionGetPlans({ commit }) {
            const query = await this.$axios.$get(`${URL_API}/api/v1/plans`)
            if (query.empty) {
                commit('mutateEmpty', query.data)
            } else {
                if (query.dolartodayError) {
                    commit('mutateDolartodayError', query)
                } else {
                    commit('mutatePlans', query.data)
                }
            }
        },
        async actionDeletePlan({ commit }, payload) {
            const query = await this.$axios.$delete(`${URL_API}/api/v1/plans/${payload}`)
        },
    }
}

export default planes