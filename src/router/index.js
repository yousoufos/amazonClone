import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
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
import listCategory from '../views/admin/categories/listCategory.vue'
import listOrders from '../views/admin/orders/listOrders.vue'
import adminOrderDetails from '../views/admin/orders/orderDetails.vue'
import listUsers from '../views/admin/users/listusers.vue'
import userDetails from '../views/admin/users/userDetails.vue'
import store from '@/store'
// import isAuth from '../middleware/Auth'

function isAuth (to, from, next) {
  if (store.getters['auth/user']) {
    next()
  } else {
    console.log('je ne suis poas autentifie')
    next('/login')
  }
}
function loginGuard (to, from, next) {
  if (store.getters['auth/user']) {
    next('/')
  } else {
    next()
  }
}
function logoutGuard (to, from, next) {
  if (!store.getters['auth/user']) {
    next('/login')
  } else {
    console.log('je suis logged')
    next()
  }
}
function isAdmin (to, from, next) {
  if (store.getters['auth/isAdmin']) {
    next()
  } else {
    next('/')
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
    beforeEnter: isAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loginGuard
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: logoutGuard
  },
  {
    path: '/checkoutproceed',
    name: 'CheckOutProceed',
    component: CheckOutProceed,
    beforeEnter: isAuth
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    beforeEnter: isAuth
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
    beforeEnter: isAuth
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
    component: createProduct,
    beforeEnter: [isAuth, isAdmin]
  },
  {
    path: '/admin/',
    name: 'adminHome',
    component: adminHome,
    beforeEnter: [isAuth, isAdmin]
  },
  {
    path: '/admin/product/listproduct',
    name: 'listProduct',
    component: listProduct,
    beforeEnter: [isAuth, isAdmin]
  },
  {
    path: '/admin/product/editproduct',
    name: 'editProduct',
    component: editProduct,
    beforeEnter: [isAuth, isAdmin]
  },
  {
    path: '/admin/category/listCategory',
    name: 'ListCategories',
    component: listCategory,
    beforeEnter: [isAuth, isAdmin]
  },
  {
    path: '/admin/orders/listOrders',
    name: 'ListOrders',
    component: listOrders,
    beforeEnter: [isAuth, isAdmin]
  },
  {
    path: '/admin/orders/orderdetails',
    name: 'adminOrderDetails',
    component: adminOrderDetails,
    beforeEnter: [isAuth, isAdmin]
  },
  {
    path: '/admin/users/listusers',
    name: 'listUsers',
    component: listUsers,
    beforeEnter: [isAuth, isAdmin]
  },
  {
    path: '/admin/users/userdetails',
    name: 'userDetails',
    component: userDetails,
    beforeEnter: [isAuth, isAdmin]
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
router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(async (authUser) => {
    if (authUser) {
      await store.dispatch('auth/getUserById', authUser.uid)
      // this.$store.state.auth.user = authUser
      next()
    } else {
      store.state.auth.user = null
      next()
    }
  })
})

export default router
