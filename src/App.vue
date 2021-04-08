<template>
    <div v-if="loading">
        <Spin />
    </div>
    <div class="relative flex flex-col h-screen" v-else>
        <Header
            class="sticky top-0 z-50"
            v-if="route.name !== 'Login' && !route.path.includes('/admin')"
        ></Header>
        <div class="flex-grow"><router-view /></div>

        <Footer
            class="mt-20"
            v-if="route.name !== 'Login' && !route.path.includes('/admin')"
        ></Footer>
    </div>
</template>
<script>
import { provideCurrency } from '../src/plugins/currencyPlugin'

import Header from '../src/components/Header'
import Footer from '../src/components/bas'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, onMounted, watchEffect } from 'vue'
export default {
    components: { Header, Footer },
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
            await store.dispatch('order/getOrders')
            await store.dispatch('promotion/getPromotions')
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
