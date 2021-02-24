<template>
    <div class="w-full">
        <canvas :id="canevasId"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    props: {
        labels: Object,
        datasets: Object,
        options: Object,
        chartType: String,
    },
    setup(props) {
        const store = useStore()
        const canevasId = ref(Math.random())
        const createChart = (params) => {
            var ctx = document.getElementById(canevasId.value).getContext('2d')

            var myChart = new Chart(ctx, {
                type: props.chartType,
                data: {
                    labels: props.labels,
                    datasets: props.datasets,
                },
                options: props.options,
            })
        }
        onMounted((params) => {
            createChart()
        })
        return { canevasId }
    },
}
</script>

<style></style>
