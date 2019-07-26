import Vuex from 'vuex'

import global from './modules/global'
import login from './modules/login'

const store = () => {
    return new Vuex.Store({
        state: {
            ...global.state,
            ...login.state,
        },
        mutations: {
            ...global.mutations,
            ...login.mutations,
        },
        actions: {}
    })
}

export default store