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
import _ from 'lodash'
import useBestSeller from '../../compositionFunctions/bestSeller'
export default {
    components: {
        Chart,
    },
    setup() {
        const store = useStore()
        const test = ref(false)
        const datasets = computed(() => {
            return [
                {
                    label: 'Best Seller',
                    data: bestSeller.value.map((product) => {
                        return product.total
                    }),
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

        const loading = ref(true)
        const { bestSeller } = useBestSeller()

        /* const orders = computed(() => {
            return store.state.order.orders
        }) */
        /* const findElem = (array, elem) => {
            return array.find((params) => {
                return params.productId === elem.productId
            })
        } */
        /* const bestSeller = computed(() => {
            const result = []
            //c'est ici que ca se passe si on veut limiter la recherche à deux dates
            var items = orders.value.map((order) => {
                return order.items
            })

            items.forEach((element) => {
                element.forEach((params) => {
                    if (typeof findElem(result, params) != 'undefined') {
                        findElem(result, params).qte += params.qte
                        findElem(result, params).total +=
                            params.price * params.qte
                    } else {
                        result.push({ ...params, total: params.price })
                    }
                })
            })

            return result
        })
 */
        const labels = computed(() => {
            return bestSeller.value
                .sort((a, b) => {
                    return b.total - a.total
                })
                .map((items) => items.title.slice(0, 20) + '...')
        })
        onMounted(async (params) => {
            //await store.dispatch('order/getOrders')

            loading.value = false
        })
        return {
            labels,
            datasets,
            options,
            loading,
            bestSeller,
        }
    },
}
</script>

<style></style>
