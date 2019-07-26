const global = {
    state: {
        modoOscuro: false,
    },
    mutations: {
        toogleOscuro(state) {
            state.modoOscuro = !state.modoOscuro
        },
    }
}

export default global