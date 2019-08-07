import Vuex from 'vuex'

import global from './modules/global'
import sesion from './modules/sesion'
import planes from './modules/planes'
import usuarios from './modules/usuarios'

const store = () => {
    return new Vuex.Store({
        state: {
            ...global.state,
            ...sesion.state,
            ...planes.state,
            ...usuarios.state
        },
        mutations: {
            ...global.mutations,
            ...sesion.mutations,
            ...planes.mutations,
            ...usuarios.mutations,
        },
        actions: {
            ...sesion.actions,
            ...planes.actions,
            ...usuarios.actions,
        },
    })
}

export default store