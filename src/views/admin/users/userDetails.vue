<template>
    <div class="flex">
        <div><Sidebar selected="Users" /></div>
        <div class="flex w-full">
            <div class="w-full width568">
                <div v-if="loading"><Spin /></div>
                <div v-else class="flex flex-col w-11/12 py-4 mx-auto">
                    <div>
                        <div class="flex flex-col text-gray-700">
                            <div>{{ user.prenom + ', ' + user.nom }}</div>
                            <div>{{ user.adresse }}</div>
                            <div>{{ user.email }}</div>
                            <div>{{ user.telephone }}</div>
                            <div class="flex">
                                <div v-if="toggleRole" class="flex space-x-4">
                                    <p>{{ user.role }}</p>
                                    <button
                                        @click="editRole"
                                        class="px-4 bg-yellow-500 rounded-md"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div
                                    v-else
                                    class="flex items-center py-2 space-x-4"
                                >
                                    <div>
                                        <select v-model="selectedRole">
                                            <option disabled value="">
                                                Choose a role
                                            </option>
                                            <option>admin</option>
                                            <option>user</option>
                                        </select>
                                    </div>
                                    <div class="space-x-4">
                                        <button
                                            @click="changeRole(user.userId)"
                                            class="px-4 bg-yellow-500 rounded-md"
                                        >
                                            Ok
                                        </button>
                                        <button
                                            @click="cancelRole"
                                            class="px-4 bg-yellow-500 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                Joined :
                                {{ moment(user.createdAt).format('LL') }}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="mt-4">
                            <div
                                class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"
                            >
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
                                                        scope="col"
                                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                    >
                                                        Date
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
                                                        Total
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                    >
                                                        Status Delivery
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                    >
                                                        Status Payment
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                class="bg-white divide-y divide-gray-200"
                                            >
                                                <tr
                                                    @click="
                                                        detail(item.orderId)
                                                    "
                                                    v-for="item in orders"
                                                    :key="item.orderId"
                                                    class="cursor-pointer"
                                                >
                                                    <td
                                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                                    >
                                                        {{ item.date }}
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                                    >
                                                        {{ item.orderId }}
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                                    >
                                                        {{
                                                            currency.$t(
                                                                item.total
                                                            )
                                                        }}
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                                    >
                                                        <span
                                                            class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-red-100 rounded-full"
                                                            :class="
                                                                item.deliveryStatus ===
                                                                'pending'
                                                                    ? 'bg-red-200'
                                                                    : 'bg-green-200'
                                                            "
                                                        >
                                                            {{
                                                                item.deliveryDate !=
                                                                null
                                                                    ? item.deliveryDate
                                                                    : item.deliveryStatus
                                                            }}</span
                                                        >
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                                    >
                                                        <span
                                                            class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-red-100 rounded-full"
                                                            :class="
                                                                item.paymentStatus ===
                                                                'pending'
                                                                    ? 'bg-red-200'
                                                                    : 'bg-green-200'
                                                            "
                                                        >
                                                            {{
                                                                item.paymentDate !=
                                                                null
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useCurrency } from '../../../plugins/currencyPlugin'
import moment from 'moment'
export default {
    components: {},

    setup() {
        const route = useRoute()
        const store = useStore()
        const router = useRouter()
        const currency = useCurrency()
        const loading = ref(true)

        const selectedRole = ref('')
        const toggleRole = ref(true)
        const changeRole = (params) => {
            if (selectedRole.value !== '') {
                store.dispatch('auth/updateUser', { role: selectedRole.value })
                toggleRole.value = false
            }
        }
        const cancelRole = (params) => {
            toggleRole.value = true
        }
        const editRole = (params) => {
            toggleRole.value = false
        }

        const user = ref(
            computed(() => {
                return store.state.auth.user
            })
        )
        const orders = ref(
            computed(() => {
                return store.state.order.orders
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
        onMounted(async (params) => {
            await store.dispatch('auth/getUserById', route.query.userId)
            await store.dispatch('order/getUserOrders', route.query.userId)
            loading.value = false
        })
        return {
            user,
            orders,
            loading,
            selectedRole,
            changeRole,
            toggleRole,
            cancelRole,
            editRole,
            currency,
            moment,
            detail,
        }
    },
}
</script>

<style></style>
