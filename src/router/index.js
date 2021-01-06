import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CheckOut from '../views/CheckOut.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import CheckOutProceed from '../views/CheckOutProceed.vue'
import Orders from '../views/Orders.vue'
import test from '../views/test.vue'
import test1 from '../views/test1.vue'
import ProductDetails from '../views/ProductDetails.vue'
import slider from '../components/slider.vue'
import notFound from '../views/404.vue'
import createProduct from '../views/CreateProduct.vue'
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
  {
    path: '/test1',
    name: 'test1',
    component: test1
  },
  {
    path: '/productdetails',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/slider',
    name: 'slider',
    component: slider
  },
  {
    path: '/admin/createproduct',
    name: 'CreateProduct',
    component: createProduct
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: notFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
