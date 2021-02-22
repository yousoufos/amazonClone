<template>
    <div @click="deleting" v-if="from.length > 0">
        <router-link :to="from[from.length - 1]"
            ><span class="material-icons text-4xl">
                keyboard_backspace
            </span></router-link
        >
    </div>
    <div class="py-4 w-11/12 mx-auto flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
                <div
                    class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                >
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date
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
                                    Total
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status Delivery
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status Payment
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr
                                @click="detail(item.orderId)"
                                v-for="item in orders"
                                :key="item.orderId"
                                class="cursor-pointer"
                            >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ item.date }}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ item.orderId }}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ currency.$t(item.total) }}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800"
                                        :class="
                                            item.deliveryStatus === 'pending'
                                                ? 'bg-red-200'
                                                : 'bg-green-200'
                                        "
                                    >
                                        {{
                                            item.deliveryDate != null
                                                ? item.deliveryDate
                                                : item.deliveryStatus
                                        }}</span
                                    >
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800"
                                        :class="
                                            item.paymentStatus === 'pending'
                                                ? 'bg-red-200'
                                                : 'bg-green-200'
                                        "
                                    >
                                        {{
                                            item.paymentDate != null
                                                ? item.paymentDate
                                                : item.paymentStatus
                                        }}</span
                                    >
                                </td>
                            </tr>

                            <!-- More rows... -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrency } from '../plugins/currencyPlugin'
export default {
    setup(props) {
        const router = useRouter()
        const store = useStore()
        const currency = useCurrency()
        const orders = ref(computed(() => store.state.order.orders))
        const from = ref(
            computed((params) => {
                if (typeof store.state.navigation.from === 'undefined') {
                    return []
                } else {
                    return store.state.navigation.from
                }
            })
        )

        const detail = (id) => {
            router.push({
                name: 'UserOrderDetails',
                query: {
                    orderId: id,
                },
            })
        }
        const deleting = (params) => {
            store.commit('navigation/removeFrom')
        }
        return {
            orders,
            detail,
            currency,
            from,
            deleting,
        }
    },

    async beforeRouteEnter(to, from, next) {
        if (store.state.auth.user) {
            await store.dispatch('order/getOrder', store.state.auth.user.userId)
            next()
        } else {
            next('/')
        }
    },
}
</script>

<style></style>
