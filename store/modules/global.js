const global = {
    state: {
        modoOscuro: false,
        showSidenav: false,
    },
    mutations: {
        mutateToogleOscuro(state) {
            state.modoOscuro = !state.modoOscuro
        },
        mutateToogleSidenav(state) {
            state.showSidenav = !state.showSidenav
        },
    },
}

export default global