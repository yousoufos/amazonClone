import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CheckOut from '../views/CheckOut.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: CheckOut
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
