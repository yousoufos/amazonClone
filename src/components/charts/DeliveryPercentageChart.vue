<template>
    <div v-if="loading">loading....</div>

    <Chart
        v-else
        :labels="labels"
        :datasets="datasets"
        :options="options"
        chartType="pie"
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
                    data: percentage.value,
                    backgroundColor: ['rgba(255, 99, 71)', 'rgba(0, 255, 255)'],
                    borderWidth: 1,
                },
            ]
        })

        const options = ref({
            legend: { display: false, labels: { boxWidth: 0 } },
        })
        const orders = computed(() => {
            return store.state.order.orders
        })

        const loading = ref(true)
        const percentage = computed(() => {
            var tab = []
            var count = orders.value.length
            var countPending = 0
            orders.value.forEach((element) => {
                if (element.deliveryStatus === 'Pending') {
                    countPending++
                }
            })
            tab.push(
                ((countPending / count) * 100).toFixed(2),
                (100 - (countPending / count) * 100).toFixed(2)
            )

            return tab
        })

        const labels = ref(['Pending', 'Delivered'])
        onMounted(async (params) => {
            loading.value = false
        })
        return { labels, datasets, options, orders, loading }
    },
}
</script>

<style></style>
