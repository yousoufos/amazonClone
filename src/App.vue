<template>
    <router-view />
</template>
<script>
import { auth } from './firebase'
export default {
    created: function () {
        auth.onAuthStateChanged((authUser) => {
            console.log(authUser)
            if (authUser) {
                this.$store.state.auth.user = authUser
            } else {
                this.$store.state.auth.user = null
            }
        })
    },
}
</script>
