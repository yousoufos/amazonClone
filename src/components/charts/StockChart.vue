<template>
    <div v-if="loading">loading....</div>
    <div v-else>
        <Chart
            :labels="labels"
            :datasets="datasets"
            :options="options"
            chartType="bar"
        ></Chart>
    </div>
</template>

<script>
import Chart from './Chart'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import useStock from '../../compositionFunctions/stock'
export default {
    components: {
        Chart,
    },
    setup() {
        const store = useStore()
        const { labels, products } = useStock()
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
        const loading = ref(true)
        /*  const products = computed(() => {
            return store.state.product.tab
        })

        const labels = computed(() => {
            return products.value
                .sort((a, b) => {
                    return b.stock - a.stock
                })
                .map((product) => product.title)
        }) */
        onMounted(async (params) => {
            loading.value = false
        })
        return { labels, datasets, options, loading, products }
    },
}
</script>

<style></style>
