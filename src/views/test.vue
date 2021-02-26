<template>
    <div v-if="loading">loading....</div>

    <Chart
        v-else
        :labels="labels"
        :datasets="datasets"
        :options="options"
        chartType="bar"
    ></Chart>
</template>

<script>
import Chart from '../components/charts/Chart'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
export default {
    components: {
        Chart,
    },
    setup() {
        const store = useStore()
        const datasets = computed(() => {
            return [
                {
                    label: 'Best Seller',
                    data: bestSeller.value
                        .sort((a, b) => {
                            return b.price - a.price
                        })
                        .map((items) => items.price),
                    backgroundColor: 'rgba(0, 255, 255)',

                    borderWidth: 2,
                },
            ]
        })

        const options = ref({
            legend: { display: true, labels: { boxWidth: 0 } },
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            //labelString: 'USD',
                        },
                        ticks: {
                            beginAtZero: true,
                            //stepSize: 1,
                            callback: function (value, index, values) {
                                return '$' + value
                            },
                        },
                    },
                ],
            },
        })
        const orders = computed(() => {
            return store.state.order.orders
        })

        const loading = ref(true)
        const findElem = (array, elem) => {
            return array.find((params) => {
                return params.productId === elem.productId
            })
        }
        const bestSeller = computed(() => {
            const result = []
            //c'est ici que ca se passe si on veut limiter la recherche à deux dates
            var items = orders.value.map((order) => {
                return order.items
            })

            items.forEach((element) => {
                element.forEach((params) => {
                    if (typeof findElem(result, params) != 'undefined') {
                        findElem(result, params).qte + params.qte
                        findElem(result, params).price + params.price
                    } else {
                        result.push(params)
                    }
                })
            })
            console.log(result)
            return result
        })
        const labels = computed(() => {
            return bestSeller.value.map((item) => {
                return item.title
            })
        })
        onMounted(async (params) => {
            await store.dispatch('order/getOrders')
            loading.value = false
        })
        return { labels, datasets, options, orders, loading, bestSeller }
    },
}
</script>

<style></style>
