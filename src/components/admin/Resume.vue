<template>
    <div class="space-y-2 mt-3">
        <p class="px-4 font-bold text-lg text-gray-700 text-center">
            Total income of the day
        </p>
        <p class="text-center text-gray-700 text-lg font-bold">
            {{ currency.$t(incomeOfTheDay) }}
        </p>
    </div>
    <div class="space-y-2 mt-3">
        <p class="px-4 font-bold text-lg text-gray-700 text-center">
            Total income of the month
        </p>
        <p class="text-center text-gray-700 text-lg font-bold">
            {{ currency.$t(incomeOfTheMonth) }}
        </p>
    </div>
    <div class="space-y-2">
        <p class="px-4 font-bold text-lg text-gray-700 text-center">
            Percentage of delivery
        </p>
        <div class="text-center text-gray-700 text-lg font-bold">
            <p>
                {{
                    percentage < 100
                        ? percentage.toFixed(2)
                        : percentage.toFixed(0)
                }}%
            </p>
            <DeliveryPercentageChart></DeliveryPercentageChart>
        </div>
    </div>
    <div class="space-y-2 mt-10">
        <p class="px-4 font-bold text-lg text-gray-700 text-center">
            Total not Paid
        </p>
        <p class="text-center text-gray-700 text-lg font-bold">
            {{ currency.$t(impaye) }}
        </p>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import moment from 'moment'
import { useCurrency } from '../../plugins/currencyPlugin'
import DeliveryPercentageChart from '../../components/charts/DeliveryPercentageChart'
export default {
    components: {
        DeliveryPercentageChart,
    },
    setup() {
        const store = useStore()
        const currency = useCurrency()
        const orders = computed(() => {
            return store.state.order.orders
        })
        const incomeOfTheDay = computed(() => {
            var total = 0
            var now = moment().format('LL')
            orders.value.forEach((element) => {
                if (element.date === now) {
                    total += element.total
                }
            })
            return total
        })
        const incomeOfTheMonth = computed(() => {
            var total = 0
            var now = moment().format('MMM')
            orders.value.forEach((element) => {
                if (moment(element.date).format('MMM') === now) {
                    total += element.total
                }
            })
            return total
        })
        const impaye = computed(() => {
            var total = 0

            orders.value.forEach((element) => {
                if (element.paymentStatus === 'pending') {
                    total += element.total
                }
            })
            return total
        })
        const percentage = computed(() => {
            var count = orders.value.length
            var countPending = 0
            orders.value.forEach((element) => {
                if (element.deliveryStatus === 'Pending') {
                    countPending++
                }
            })

            return 100 - (countPending / count) * 100
        })
        return {
            incomeOfTheDay,
            currency,
            incomeOfTheMonth,
            impaye,
            percentage,
        }
    },
}
</script>

<style></style>
