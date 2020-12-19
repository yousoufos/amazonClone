<template>
    <nav-bar></nav-bar>
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
                            <tr v-for="item in orders" :key="item.orderId">
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
                                    {{ item.total }}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800"
                                    >
                                        {{ item.deliveryStatus }}</span
                                    >
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800"
                                    >
                                        {{ item.paymentStatus }}</span
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
import navBar from '../components/Header'
import store from '@/store'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
export default {
    components: { 'nav-bar': navBar },
    setup(props) {
        const store = useStore()
        const orders = ref(computed(() => store.state.order.order))

        return {
            orders,
        }
    },

    async beforeRouteEnter(to, from, next) {
        if (store.state.auth.user) {
            await store.dispatch('order/getOrder', store.state.auth.user.uid)
            next()
        } else {
            next('/')
        }
    },
}
</script>

<style></style>
