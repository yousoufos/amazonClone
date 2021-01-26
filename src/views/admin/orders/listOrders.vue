<template>
    <div class="">
        <div>
            <navbar title="List Orders"></navbar>
        </div>
        <div class="flex">
            <div><sidebar selected="Orders"></sidebar></div>
            <div class="width568 w-full">
                <div class="py-4 mx-auto flex flex-col w-11/12">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div
                            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
                        >
                            <div
                                class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                            >
                                <table
                                    class="min-w-full divide-y divide-gray-200"
                                >
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                @click="sortByDate"
                                                scope="col"
                                                class="flex items-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer space-x-1"
                                            >
                                                <span>Date</span
                                                ><span class="material-icons">
                                                    sort
                                                </span>
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Order Number
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Customer Name
                                            </th>
                                            <th
                                                @click="sortByPrice"
                                                scope="col"
                                                class="flex items-center space-x-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                <span>Total</span
                                                ><span class="material-icons">
                                                    sort
                                                </span>
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Delivery Status
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Payment Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="bg-white divide-y divide-gray-200 cursor-pointer"
                                    >
                                        <tr
                                            v-for="order in orders"
                                            :key="order.orderId"
                                            @click="details(order)"
                                        >
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {{ order.date }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {{ order.orderId }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {{ order.user.data.email }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {{ order.total }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                <span
                                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200"
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
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                <span
                                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200"
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
import navbar from '../../../components/admin/navbar'
import sidebar from '../../../components/admin/sidebar'
import { computed, onMounted, ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    components: {
        navbar,
        sidebar,
    },

    setup() {
        const router = useRouter()
        const store = useStore()
        const sortByPriceValue = ref('DESC')
        const sortByDateValue = ref('DESC')
        const orders = ref(
            computed(() => {
                return store.state.order.orders
            })
        )
        const details = ref((params) => {
            router.push({
                name: 'adminOrderDetails',
                query: {
                    orderId: params.orderId,
                },
            })
        })
        const sortByPrice = (params) => {
            if (sortByPriceValue.value === 'DESC') {
                store.dispatch('order/sortByPrice', sortByPriceValue.value)
                sortByPriceValue.value = 'ASC'
                return
            }
            if (sortByPriceValue.value === 'ASC') {
                store.dispatch('order/sortByPrice', sortByPriceValue.value)
                sortByPriceValue.value = 'DESC'
                return
            }
        }
        const sortByDate = (params) => {
            if (sortByDateValue.value === 'DESC') {
                store.dispatch('order/sortByDate', sortByDateValue.value)
                sortByDateValue.value = 'ASC'
                return
            }
            if (sortByDateValue.value === 'ASC') {
                store.dispatch('order/sortByDate', sortByDateValue.value)
                sortByDateValue.value = 'DESC'
                return
            }
        }
        onMounted(async (params) => {
            await store.dispatch('order/getOrders')
        })
        return { orders, details, sortByPrice, sortByDate, sortByDateValue }
    },
}
</script>

<style></style>
