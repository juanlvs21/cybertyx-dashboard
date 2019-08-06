import Vuex from 'vuex'

import global from './modules/global'
import sesion from './modules/sesion'
import planes from './modules/planes'

const store = () => {
    return new Vuex.Store({
        state: {
            ...global.state,
            ...sesion.state,
            ...planes.state
        },
        mutations: {
            ...global.mutations,
            ...sesion.mutations,
            ...planes.mutations,
        },
        actions: {
            ...sesion.actions,
            ...planes.actions,
        },
    })
}

export default store