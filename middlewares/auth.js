export default function ({ store, redirect, route }) {
  const isAuth = store.getters.getAuth

  if ((route.name === 'document-signup' || route.name === 'document-create' || route.name === 'index' || route.name === 'document-signin') && isAuth) {
    
    return redirect({ path: `/link${store.getters.getLink.split('/link')[1]}` })
  }

  if ((route.name === 'document-link') && !isAuth) {
    return redirect({ path: '/' })
  }
}