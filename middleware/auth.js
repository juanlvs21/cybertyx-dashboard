export default function({ store, error, redirect, app }) {
    // const user = window.sessionStorage.getItem('session')
    if (!store.state.authUser) {
        store.dispatch('actionRelogin')
        return redirect('/login')
    }
}