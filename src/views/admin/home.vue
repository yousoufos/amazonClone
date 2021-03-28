<template>
    <div class="flex">
        <div>
            <Sidebar selected="adminHome" />
        </div>
        <div class="flex flex-col w-full">
            <!-- <div><navbar title="Borad"></navbar></div> -->
            <div class="w-full h-screen overflow-y-auto">
                <div v-if="loading">
                    <Spin />
                </div>
                <div
                    v-else
                    class="grid w-full grid-cols-2 gap-2 p-2 bg-gray-200"
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

                    <div class="grid grid-cols-2 gap-2 bg-white rounded-lg">
                        <Resume></Resume>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StockChart from '../../components/charts/StockChart'
import IncomeChart from '../../components/charts/IncomeChart'
import BestSellerChart from '../../components/charts/BestSellerChart'
import Resume from '../../components/admin/Resume'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
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
