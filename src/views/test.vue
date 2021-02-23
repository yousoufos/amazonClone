<template>
    <div v-if="loading">loading....</div>
    <div v-else>
        <MonthlyChart
            :labels="labels"
            :datasets="datasets"
            :options="options"
            :products="products"
        ></MonthlyChart>
    </div>
</template>

<script>
import MonthlyChart from '../components/charts/MonthlyChart'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        MonthlyChart,
    },
    setup() {
        const store = useStore()
        const datasets = computed(() => {
            return [
                {
                    label: 'Product stock',
                    data: products.value
                        .sort((a, b) => {
                            return b.stock - a.stock
                        })
                        .map((product) => product.stock),
                    backgroundColor: products.value.map((product) => '#DE3A17'),
                    borderWidth: 1,
                },
            ]
        })

        const options = ref({
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        })
        const products = computed(() => {
            console.log(store.state.product.tab)
            return store.state.product.tab
        })

        const loading = computed(() => {
            return store.state.navigation.loading
        })
        const labels = computed(() => {
            return products.value.map((product) => {
                return product.title
            })
        })
        onMounted(async (params) => {
            //await store.dispatch('product/getProducts')
        })
        return { labels, datasets, options, products, loading }
    },
}
</script>

<style></style>
