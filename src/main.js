import { createApp } from 'vue'
import App from './App.vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import './style/style.css'
import Spin from '@/components/Spin'
import Notif from '@/components/notif'
import Sidebar from '@/components/admin/sidebar'
import Pagination from '@/components/Pagination'
import VueProgressBar from '@aacassandra/vue3-progressbar'

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

let app
let handleOutsideClick
auth.onAuthStateChanged((authUser) => {
  if (!app) {
    app = createApp(App)

    app.directive('closable', {
      beforeMount (el, binding, vnode) {
        // Here's the click/touchstart handler
        // (it is registered below)
        handleOutsideClick = (e) => {
          e.stopPropagation()
          // Get the handler method name and the exclude array
          // from the object used in v-closable
          const { handler, exclude } = binding.value

          // This variable indicates if the clicked element is excluded
          let clickedOnExcludedEl = false

          if (!clickedOnExcludedEl) {
            // Get the element using the reference name
            const excludedEl = exclude
            // See if this excluded element
            // is the same element the user just clicked on
            clickedOnExcludedEl = excludedEl.contains(e.target)
          }

          // We check to see if the clicked element is not
          // the dialog element and not excluded
          if (!el.contains(e.target) && !clickedOnExcludedEl) {
            // If the clicked element is outside the dialog
            // and not the button, then call the outside-click handler
            // from the same component this directive is used in
            handler()
          }
        }
        // Register click/touchstart event listeners on the whole page
        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('touchstart', handleOutsideClick)
      },

      unmounted () {
        // If the element that has v-closable is removed, then
        // unbind click/touchstart listeners from the whole page
        document.removeEventListener('click', handleOutsideClick)
        document.removeEventListener('touchstart', handleOutsideClick)
      }
    })
    app.use(store)
    app.use(router)
    app.use(CKEditor)
    app.use(VueProgressBar, options)
    app.component('Spin', Spin)
    app.component('Notif', Notif)
    app.component('Sidebar', Sidebar)
    app.component('Pagination', Pagination)

    app.mount('#app')
  }
})
