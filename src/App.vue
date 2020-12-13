<template>
    <router-view />
</template>
<script>
import { auth } from './firebase'
export default {
    mounted: function () {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.$store.state.auth.user = authUser
            } else {
                this.$store.state.auth.user = null
            }
        })
    },
}
</script>
