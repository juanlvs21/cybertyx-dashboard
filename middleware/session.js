export default function({ store, error, redirect, app }) {
    const cookieSession = app.$cookies.get('session')
    if (cookieSession) {
        store.dispatch('actionRelogin', cookieSession)
            .then(() => {
                if (!store.state.authUser) {
                    return redirect('/login')
                }
            })
            .catch(err => {
                console.log('Error: ', err)
            })

    } else {
        return redirect('/login')
    }
}