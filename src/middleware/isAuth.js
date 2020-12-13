import { useState } from 'vuex'
const store = useState()
function isAuth(to, from, next) {
    if (store.state.auth.user) {
    }
}
