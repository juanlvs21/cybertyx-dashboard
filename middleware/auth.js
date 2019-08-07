export default function({ store, error, redirect, app }) {
    const cookieSession = app.$cookies.get('session')
    if (cookieSession) {
        store.dispatch('actionRelogin', cookieSession)
            .then(() => {
                if (!store.state.authUser) {
                    return redirect('/login')
                }
            })

    } else {
        return redirect('/login')
    }
}