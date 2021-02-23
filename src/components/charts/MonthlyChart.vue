<template>
    <div class="w-1/2 mx-auto">
        <canvas id="myChart" width="" height=""></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'
import { ref, onMounted } from 'vue'
export default {
    props: {
        labels: Object,
        datasets: Object,
        options: Object,
        products: Object,
    },
    setup(props) {
        onMounted((params) => {
            console.log(props.products)
            var ctx = document.getElementById('myChart').getContext('2d')
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: props.labels,
                    datasets: props.datasets,
                },
                options: props.options,
            })
        })
        return {}
    },
}
</script>

<style></style>
