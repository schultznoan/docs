export default function ({ store, redirect, route }) {
  const isAuth = store.getters.getAuth

  if ((route.name === 'document-signup' || route.name === 'document-create' || route.name === 'index' || route.name === 'document-signin') && isAuth) {
    return redirect({ path: '/document/list' })
  }

  if ((route.name === 'document-list' || route.name === 'document-link') && !isAuth) {
    return redirect({ path: '/' })
  }
}