import store from '@/store'

export function isAuth (to, from, next) {
  if (store.getters['auth/user']) {
    next('/')
  } else {
    next()
  }
}
