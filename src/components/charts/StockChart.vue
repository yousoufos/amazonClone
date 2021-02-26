<template>
    <div v-if="loading">loading....</div>
    <div v-else>
        <Chart
            :labels="labels"
            :datasets="datasets"
            :options="options"
            :products="products"
            chartType="bar"
        ></Chart>
    </div>
</template>

<script>
import Chart from './Chart'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        Chart,
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
                    backgroundColor: products.value.map(
                        (product) =>
                            `rgb(${Math.floor(
                                Math.random() * 255
                            )},${Math.round(Math.random() * 255)},${Math.round(
                                Math.random() * 255
                            )})`
                    ),
                    borderWidth: 1,
                },
            ]
        })

        const options = ref({
            legend: { display: true, labels: { boxWidth: 0 } },
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
            return store.state.product.tab
        })

        const loading = ref(true)
        const labels = computed(() => {
            return products.value
                .sort((a, b) => {
                    return b.stock - a.stock
                })
                .map((product) => product.title)
        })
        onMounted(async (params) => {
            loading.value = false
        })
        return { labels, datasets, options, products, loading }
    },
}
</script>

<style></style>
