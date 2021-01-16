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
import createProduct from '../views/admin/product/newProduct.vue'
import UserOrderDetails from '../views/UserOrderDetails.vue'
import adminHome from '../views/admin/home.vue'
import listProduct from '../views/admin/product/listProduct.vue'
import editProduct from '../views/admin/product/editproduct.vue'
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
    component: CheckOutProceed,
    beforeEnter: isNotAuth
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: isNotAuth
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
    path: '/userorderdetails',
    name: 'UserOrderDetails',
    component: UserOrderDetails,
    beforeEnter: isNotAuth
  },
  {
    path: '/slider',
    name: 'slider',
    component: slider
  },
  // Admin Section
  {
    path: '/admin/product/newproduct',
    name: 'CreateProduct',
    component: createProduct
  },
  {
    path: '/admin/',
    name: 'adminHome',
    component: adminHome
  },
  {
    path: '/admin/product/listproduct',
    name: 'listProduct',
    component: listProduct
  },
  {
    path: '/admin/product/editproduct',
    name: 'editProduct',
    component: editProduct
  },
  // errors
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
