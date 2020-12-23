import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CheckOut from '../views/CheckOut.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import CheckOutProceed from '../views/CheckOutProceed.vue'
import Orders from '../views/Orders.vue'
import test from '../views/test.vue'
import store from '@/store'
// import isAuth from '../middleware/Auth'

function isAuth (to, from, next) {
  if (store.getters['auth/user']) {
    next('/')
  } else {
    next()
  }
}
function isNotAuth (to, from, next) {
  if (!store.getters['auth/user']) {
    next('/login')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckOut,
    beforeEnter: isNotAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: isAuth
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: isNotAuth
  },
  {
    path: '/checkoutproceed',
    name: 'CheckOutProceed',
    component: CheckOutProceed
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
