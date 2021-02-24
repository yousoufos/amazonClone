<template>
    <div class="">
        <div>
            <navbar title="Admin Page"></navbar>
        </div>
        <div class="flex">
            <div><sidebar></sidebar></div>
            <div class="w-full flex">
                <div class="w-1/2">
                    <StockChart></StockChart>
                </div>
                <div class="w-1/2">
                    <IncomeChart></IncomeChart>
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
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        navbar,
        sidebar,
        StockChart,
        IncomeChart,
    },
    setup() {
        const store = useStore()
        const loading = computed(() => {
            return store.state.navigation.loading
        })
        onMounted(() => {})
        return {
            loading,
        }
    },
}
</script>

<style></style>
