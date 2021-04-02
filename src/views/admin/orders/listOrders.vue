<template>
    <div class="flex">
        <div><Sidebar selected="Orders" /></div>
        <div class="flex w-full">
            <div class="w-full h-screen overflow-y-auto width568">
                <div v-if="loading"><Spin /></div>
                <div v-else class="flex flex-col w-11/12 py-4 mx-auto">
                    <Pagination :pas="20" type="orders" :data="orders" />
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div
                            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                        >
                            <div
                                class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
                            >
                                <table
                                    class="min-w-full divide-y divide-gray-200"
                                >
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                @click="sortByDate"
                                                scope="col"
                                                class="flex items-center px-6 py-3 space-x-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                                            >
                                                <span>Date</span
                                                ><span class="material-icons">
                                                    sort
                                                </span>
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Order Number
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Customer Name
                                            </th>
                                            <th
                                                @click="sortByPrice"
                                                scope="col"
                                                class="flex items-center px-6 py-3 space-x-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                                            >
                                                <span>Total</span
                                                ><span class="material-icons">
                                                    sort
                                                </span>
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Delivery Status
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Payment Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="bg-white divide-y divide-gray-200 cursor-pointer"
                                    >
                                        <tr
                                            v-for="order in tab"
                                            :key="order.orderId"
                                            @click="details(order)"
                                        >
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                {{ order.date }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                {{ order.orderId }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                {{ order.user.data.email }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                {{ currency.$t(order.total) }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                <span
                                                    class="inline-flex px-2 text-xs font-semibold leading-5 bg-red-200 rounded-full"
                                                    :class="
                                                        order.deliveryStatus ===
                                                        'pending'
                                                            ? 'bg-red-200'
                                                            : 'bg-green-200'
                                                    "
                                                >
                                                    {{
                                                        order.deliveryDate !=
                                                        null
                                                            ? order.deliveryDate
                                                            : order.deliveryStatus
                                                    }}</span
                                                >
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                <span
                                                    class="inline-flex px-2 text-xs font-semibold leading-5 bg-red-200 rounded-full"
                                                    :class="
                                                        order.paymentStatus ===
                                                        'pending'
                                                            ? 'bg-red-200'
                                                            : 'bg-green-200'
                                                    "
                                                >
                                                    {{
                                                        order.paymentDate !=
                                                        null
                                                            ? order.paymentDate
                                                            : order.paymentStatus
                                                    }}</span
                                                >
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCurrency } from '../../../plugins/currencyPlugin'
import { computed, onMounted, ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import moment from 'moment'
export default {
    components: {},

    setup() {
        const router = useRouter()
        const store = useStore()
        const currency = useCurrency()
        const loading = ref(true)
        const sortByPriceValue = ref('DESC')
        const sortByDateValue = ref('DESC')
        const orders = computed(() => {
            return store.state.order.orders.sort((a, b) => {
                if (moment(a.date) > moment(b.date)) {
                    return -1
                } else return 1
            })
        })

        const details = ref((params) => {
            router.push({
                name: 'adminOrderDetails',
                query: {
                    orderId: params.orderId,
                },
            })
        })
        const sortByPrice = (params) => {
            sortType.value = 'price'
            /* if (sortByPriceValue.value === 'DESC') {
                store.dispatch('order/sortByPrice', sortByPriceValue.value)
                sortByPriceValue.value = 'ASC'
                return
            }
            if (sortByPriceValue.value === 'ASC') {
                store.dispatch('order/sortByPrice', sortByPriceValue.value)
                sortByPriceValue.value = 'DESC'
                return
            } */
        }
        const sortByDate = (params) => {
            sortType.value = 'date'
            /* if (sortByDateValue.value === 'DESC') {
                store.dispatch('order/sortByDate', sortByDateValue.value)
                sortByDateValue.value = 'ASC'
                return
            }
            if (sortByDateValue.value === 'ASC') {
                store.dispatch('order/sortByDate', sortByDateValue.value)
                sortByDateValue.value = 'DESC'
                return
            } */
        }
        const sortType = ref('')
        const tab = computed(() => {
            var obj = store.getters['navigation/getOrdersPagination']
            if (sortType.value === 'date') {
                if (sortByDateValue.value === 'DESC') {
                    sortByDateValue.value = 'ASC'
                    sortType.value = ''
                    return obj.sort((a, b) => {
                        if (moment(a.date) > moment(b.date)) {
                            return -1
                        } else return 1
                    })
                }
                if (sortByDateValue.value === 'ASC') {
                    sortByDateValue.value = 'DESC'
                    sortType.value = ''
                    return obj.sort((a, b) => {
                        if (moment(a.date) < moment(b.date)) {
                            return -1
                        } else return 1
                    })
                }
            }
            if (sortType.value === 'price') {
                if (sortByPriceValue.value === 'DESC') {
                    sortByPriceValue.value = 'ASC'
                    sortType.value = ''
                    return obj.sort((a, b) => {
                        return b.total - a.total
                    })
                }
                if (sortByPriceValue.value === 'ASC') {
                    sortByPriceValue.value = 'DESC'
                    sortType.value = ''
                    return obj.sort((a, b) => {
                        return a.total - b.total
                    })
                }
            }
            return store.getters['navigation/getOrdersPagination']
        })

        onMounted(async (params) => {
            await store.dispatch('order/getOrders')
            loading.value = false
        })
        return {
            orders,
            details,
            sortByPrice,
            sortByDate,
            sortByDateValue,
            currency,
            tab,
            loading,
        }
    },
}
</script>

<style></style>
