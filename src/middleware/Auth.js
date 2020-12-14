import store from '@/store'

export function isAuth (to, from, next) {
  console.log(store.getters['auth/user'])
  if (store.getters['auth/user']) {
    next('/')
  } else {
    next()
  }
}
