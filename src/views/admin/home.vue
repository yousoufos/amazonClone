<template>
    <div class="">
        <div>
            <navbar title="Borad"></navbar>
        </div>
        <div class="flex">
            <div><sidebar></sidebar></div>
            <div class="w-full h-sc overflow-y-auto">
                <div v-if="loading">
                    <svg
                        class="animate-spin h-10 w-10 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 4335 4335"
                    >
                        <path
                            fill="#F59E0B"
                            d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"
                        />
                    </svg>
                </div>
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
