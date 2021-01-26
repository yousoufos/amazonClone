<template>
    <router-view />
</template>
<script>
import { auth } from './firebase'
export default {
    mounted: function () {
        /* auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                console.log(authUser)
                await this.$store.dispatch('auth/getUserById', authUser.uid)
                //this.$store.state.auth.user = authUser
            } else {
                this.$store.state.auth.user = null
            }
        }) */
    },
}
</script>
