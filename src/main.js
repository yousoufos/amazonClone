import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import './style/style.css'

let app

auth.onAuthStateChanged((authUser) => {
  if (!app) {
    app = createApp(App)
    app.use(store)
    app.use(router)
    app.mount('#app')
  }
})
