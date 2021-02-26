<template>
    <div v-if="loading">
        <spin></spin>
    </div>
    <div v-else>
        <Header
            v-if="route.name !== 'Login' && !route.path.includes('/admin')"
        ></Header>
        <router-view />
        <Footer
            v-if="route.name !== 'Login' && !route.path.includes('/admin')"
        ></Footer>
    </div>
</template>
<script>
import { provideCurrency } from '../src/plugins/currencyPlugin'
import spin from './components/Spin'
import Header from '../src/components/Header'
import Footer from '../src/components/bas'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, onMounted, watchEffect } from 'vue'
export default {
    components: { Header, Footer, spin },
    setup() {
        const route = useRoute()
        const store = useStore()
        const loading = ref(true)

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
            loading.value = false
        })
        return { route, loading }
    },
}
</script>
