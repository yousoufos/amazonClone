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
                    data: orders.value.map((order) => order.total),
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
            },
        })
        const orders = computed(() => {
            return store.state.order.orders
        })

        const loading = ref(true)
        const labels = computed(() => {
            return orders.value.map((order) => {
                return order.date
            })
        })
        onMounted(async (params) => {
            await store.dispatch('order/getOrders')
            loading.value = false
        })
        return { labels, datasets, options, orders, loading }
    },
}
</script>

<style></style>
