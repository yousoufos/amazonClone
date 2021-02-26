<template>
    <div class="">
        <div>
            <navbar title="Borad"></navbar>
        </div>
        <div class="flex">
            <div><sidebar></sidebar></div>
            <div class="w-full">
                <div v-if="loading">Loading...</div>
                <div
                    v-else
                    class="w-full p-2 grid grid-cols-2 gap-2 bg-gray-200"
                >
                    <div class="bg-white rounded-lg">
                        <StockChart></StockChart>
                    </div>
                    <div class="bg-white rounded-lg">
                        <IncomeChart></IncomeChart>
                    </div>
                    <div class="bg-white rounded-lg">
                        <BestSellerChart></BestSellerChart>
                    </div>
                    <div class="bg-white rounded-lg grid grid-cols-2 gap-2">
                        <Resume></Resume>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '../../components/admin/navbar'
import sidebar from '../../components/admin/sidebar'
import StockChart from '../../components/charts/StockChart'
import IncomeChart from '../../components/charts/IncomeChart'
import BestSellerChart from '../../components/charts/BestSellerChart'
import Resume from '../../components/admin/Resume'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        navbar,
        sidebar,
        StockChart,
        IncomeChart,
        BestSellerChart,
        Resume,
    },
    setup() {
        const store = useStore()
        const loading = ref(true)
        onMounted(async () => {
            await store.dispatch('order/getOrders')
            loading.value = false
        })
        return {
            loading,
        }
    },
}
</script>

<style></style>
