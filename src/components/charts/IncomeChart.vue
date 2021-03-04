<template>
    <div v-if="loading">loading....</div>

    <Chart
        v-else
        :labels="labels"
        :datasets="datasets"
        :options="options"
        chartType="line"
    ></Chart>
</template>

<script>
import Chart from './Chart'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import useIncome from '../../compositionFunctions/income'
export default {
    components: {
        Chart,
    },
    setup() {
        const store = useStore()

        const datasets = computed(() => {
            return [
                {
                    label: 'Total Income',
                    data: groupByDate.value.map((order) => order.total),
                    backgroundColor: 'rgba(255, 99, 71, 0)',
                    borderColor: '#FF0000',
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
                            callback: function (value, index, values) {
                                return '$' + value
                            },
                        },
                    },
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            //labelString: 'USD',
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return moment(value).format('l')
                            },
                        },
                    },
                ],
            },
        })
        const loading = ref(true)
        const { labels, groupByDate } = useIncome()

        /*
        const findElem = (array, elem) => {
            return array.find((params) => {
                return params.date === elem.date
            })
        }
        const groupByDate = computed(() => {
            const result = []
            orders.value.forEach((element) => {
                if (typeof findElem(result, element) !== 'undefined') {
                    findElem(result, element).total + element.total
                } else {
                    result.push(element)
                }
            })

            return result
        })
        const labels = computed(() => {
            return groupByDate.value
                .sort((a, b) => {
                    if (moment(a.date) > moment(b.date)) {
                        return 1
                    } else {
                        return -1
                    }
                })
                .map((order) => {
                    return order.date
                })
        }) */
        onMounted(async (params) => {
            //await store.dispatch('order/getOrders')
            loading.value = false
        })
        return { labels, datasets, options, loading }
    },
}
</script>

<style></style>
