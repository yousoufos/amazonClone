<template>
    <div>
        <div @click="deleting" v-if="from.length > 0">
            <router-link :to="from[from.length - 1]"
                ><span class="text-4xl material-icons">
                    keyboard_backspace
                </span></router-link
            >
        </div>
        <div class="flex flex-col w-11/12 py-4 mx-auto">
            <Pagination ref="child" :pas="30" type="orders" :data="orders" />
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                >
                    <div
                        class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
                    >
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        @click="sortByDate"
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
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
                                        @click="sortByPrice"
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
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
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    @click="detail(item.orderId)"
                                    v-for="item in tab"
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
                                        {{ currency.$t(item.total) }}
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
                                                item.deliveryDate != null
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
    </div>
</template>

<script>
import store from '@/store'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrency } from '../plugins/currencyPlugin'

import moment from 'moment'
export default {
    components: {},
    setup(props) {
        const router = useRouter()
        const store = useStore()
        const sortByPriceValue = ref('DESC')
        const sortByDateValue = ref('DESC')
        const currency = useCurrency()
        const orders = ref(
            computed(() => {
                return store.state.order.orders.sort((a, b) => {
                    if (moment(a) < moment(b)) {
                        return -1
                    } else return 1
                })
            })
        )
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
                        if (moment(a) > moment(b)) {
                            return 1
                        } else return -1
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

        return {
            orders,
            detail,
            currency,
            from,
            deleting,
            tab,
            sortByPrice,
            sortByDate,
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
