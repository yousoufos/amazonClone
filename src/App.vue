<template>
    <router-view />
</template>
<script>
import { auth } from './firebase'
import { provideCurrency } from '../src/plugins/currencyPlugin'
export default {
    setup() {
        provideCurrency({
            locale: 'USD',
            options: {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            },
        })
    },
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
