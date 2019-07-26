const global = {
    state: {
        modoOscuro: false,
        modalCerrarSesion: false,
        showSidenav: false,
    },
    mutations: {
        toogleOscuro(state) {
            state.modoOscuro = !state.modoOscuro
        },
        toogleSidenav(state) {
            state.showSidenav = !state.showSidenav
        },
        logout(state) {
            state.modalCerrarSesion = false
            this.$router.push({ path: 'login' })
        },
    },
    getters: {
        getShowSidenav(state) {
            return state.showSidenav
        }
    }
}

export default global