<template>
    <router-view />
</template>
<script>
import { auth } from './firebase'
import { provideI18n } from '../src/plugins/i18nPlugin'
export default {
    setup() {
        provideI18n({
            locale: 'en',
            messages: {
                en: {
                    hello_world: 'Hello world',
                },
                es: {
                    hello_world: 'Hola mundo',
                },
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
