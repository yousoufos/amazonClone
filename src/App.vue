<template>
    <Header v-if="route.name !== 'Login'"></Header>
    <router-view />
    <Footer v-if="route.name !== 'Login'"></Footer>
</template>
<script>
import { provideCurrency } from '../src/plugins/currencyPlugin'
import Header from '../src/components/Header'
import Footer from '../src/components/bas'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
export default {
    components: { Header, Footer },
    setup() {
        const route = useRoute()
        const store = useStore()
        provideCurrency({
            locale: 'USD',
            options: {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            },
        })
        onMounted(async (params) => {
            store.commit('navigation/setLoading', true)
            await store.dispatch('product/getProducts')
            if (store.getters['auth/user']) {
                await store.dispatch(
                    'cart/getUserCart',
                    store.getters['auth/user'].userId
                )
            }
            store.commit('navigation/setLoading', false)
        })
        return { route }
    },
}
</script>
