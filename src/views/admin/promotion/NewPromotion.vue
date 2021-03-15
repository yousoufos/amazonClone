<template>
    <div class="flex">
        <div><sidebar :selected="selected"></sidebar></div>
        <div class="flex w-full">
            <div class="w-full h-screen overflow-y-auto width568">
                <div v-if="loading">Loading...</div>
                <div v-else class="flex flex-col w-11/12 py-4 mx-auto"></div>
            </div>
        </div>
    </div>
</template>

<script>
import sidebar from '../../../components/admin/sidebar'
import spin from '../../../components/Spin'
import Pagination from '../../../components/Pagination'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useCurrency } from '../../../plugins/currencyPlugin'
export default {
    components: {
        sidebar,
        spin,
        Pagination,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const currency = useCurrency()
        const toggle = ref(true)
        const selected = ref('Promotion')
        const loading = ref(true)

        onMounted(async () => {
            //await store.dispatch('product/getProducts')
            loading.value = false
        })

        return {
            toggle,
            selected,
            loading,

            currency,
        }
    },
}
</script>

<style>
@media screen and (max-width: 768px) {
    .width655px {
        width: 768px;
    }
}
</style>
