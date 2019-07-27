import Vuex from 'vuex'

import global from './modules/global'
import sesion from './modules/sesion'

const store = () => {
    return new Vuex.Store({
        state: {
            ...global.state,
            ...sesion.state,
        },
        mutations: {
            ...global.mutations,
            ...sesion.mutations,
        },
        actions: {
            ...sesion.actions,
        }
    })
}

export default store