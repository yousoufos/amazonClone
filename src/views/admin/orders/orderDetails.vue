<template>
    <div class="flex">
        <div><Sidebar selected="Orders" /></div>
        <div class="flex w-full">
            <div class="w-full h-screen overflow-y-auto width568">
                <div v-if="loading">Loading...</div>
                <div v-else>
                    <div v-if="order.error === 'forbiden'">
                        Forbidden access
                    </div>
                    <div v-else class="flex flex-col mx-auto bg-gray-200">
                        <div class="flex p-4 space-x-4">
                            <div class="flex flex-col cursor-pointer">
                                <button
                                    :class="{
                                        'disabled:opacity-50':
                                            order.deliveryStatus ===
                                            'Delivered',
                                    }"
                                    :disabled="
                                        order.deliveryStatus === 'Delivered'
                                    "
                                    v-if="!showDelivered"
                                    @click="toggleDelivered"
                                    class="flex p-2 space-x-1 text-gray-200 bg-green-500 rounded-md"
                                >
                                    <span class="material-icons">
                                        local_shipping </span
                                    ><span>Mark as Delivered</span>
                                </button>
                                <div v-else class="bg-white">
                                    <div>
                                        <input
                                            v-model="deliveryDate"
                                            class="rounded-md"
                                            type="date"
                                        />
                                    </div>
                                    <div class="mt-2">
                                        <button
                                            @click="addDelivered"
                                            class="w-full bg-yellow-500 rounded-md"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="cursor-pointer">
                                <button
                                    :class="{
                                        'disabled:opacity-50':
                                            order.paymentStatus === 'Paid',
                                    }"
                                    :disabled="order.paymentStatus === 'Paid'"
                                    v-if="!showPayment"
                                    @click="togglePayment"
                                    class="flex p-2 space-x-1 text-gray-200 bg-blue-500 rounded-md"
                                >
                                    <span class="material-icons">
                                        monetization_on </span
                                    ><span>Add Payment</span>
                                </button>
                                <div v-else class="flex flex-col bg-white">
                                    <div class="flex flex-col space-y-2">
                                        <input
                                            v-model="paymentDate"
                                            class="rounded-md"
                                            type="date"
                                        />
                                    </div>
                                    <div class="mt-2">
                                        <button
                                            @click="addPayment"
                                            class="w-full bg-yellow-500 rounded-md"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex p-2 text-base font-semibold">
                            Order Details
                        </div>
                        <div class="p-2 my-2 text-sm tracking-wide bg-white">
                            <p class="font-semibold">
                                Order N°: {{ order.orderId }}
                            </p>
                            <p class="text-gray-800">
                                Created At: {{ order.date }}
                            </p>
                            <p class="text-gray-800">
                                Total: {{ currency.$t(order.total) }}
                            </p>
                            <p v-if="order.paymentDate != null">
                                Payment Date: {{ order.paymentDate }}
                            </p>
                        </div>
                        <div>
                            <div class="p-2 text-gray-800">
                                <p>Articles</p>
                            </div>
                            <div class="space-y-2">
                                <div
                                    v-for="item in order.items"
                                    :key="item.id"
                                    class="p-4 mx-2 bg-white rounded-md"
                                >
                                    <div class="space-y-2 text-sm border-b">
                                        <span
                                            class="p-1 text-gray-100"
                                            :class="
                                                order.deliveryStatus ===
                                                'pending'
                                                    ? 'bg-red-400'
                                                    : 'bg-green-500'
                                            "
                                            >{{ order.deliveryStatus }}</span
                                        >
                                        <p>
                                            {{
                                                order.deliveryDate != null
                                                    ? order.deliveryDate
                                                    : ''
                                            }}
                                        </p>
                                    </div>
                                    <div class="flex p-2">
                                        <div>
                                            <img
                                                class="w-20 h-20 lg:w-40 lg:h-40"
                                                :src="
                                                    item.defaultPicture === ''
                                                        ? require('../../../assets/no-image.jpg')
                                                        : item.defaultPicture
                                                "
                                                alt=""
                                            />
                                        </div>
                                        <div class="px-2 space-y-2 text-sm">
                                            <p>{{ item.title }}</p>
                                            <p>Qte: {{ item.qte }}</p>
                                            <p class="font-semibold">
                                                {{ currency.$t(item.price) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="p-2 text-gray-800">
                                <p>Payment</p>
                            </div>
                            <div class="p-4 mx-2 bg-white rounded-md">
                                <div class="space-y-1 border-b">
                                    <span class="text-xs font-semibold"
                                        >Payment Method</span
                                    >
                                    <p class="text-xs text-gray-500">
                                        {{ order.paymentMethod }}
                                    </p>
                                </div>
                                <div class="flex flex-col py-2 space-y-1">
                                    <span class="text-xs font-semibold"
                                        >Payment Details</span
                                    >
                                    <div class="flex">
                                        <span class="text-xs text-gray-500"
                                            >Total articles :
                                        </span>
                                        <span class="ml-2 text-xs"
                                            >{{ currency.$t(order.total) }}
                                        </span>
                                    </div>
                                    <div class="flex">
                                        <span class="text-xs text-gray-500"
                                            >Delevery :
                                        </span>
                                        <span class="ml-2 text-xs">{{
                                            currency.$t(8)
                                        }}</span>
                                    </div>
                                    <div class="flex py-2">
                                        <span class="text-xs text-gray-500"
                                            >Total :
                                        </span>
                                        <span class="ml-2 text-xs">{{
                                            currency.$t(order.total)
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="p-2 text-gray-800"><p>Delevery</p></div>
                            <div class="p-4 mx-2 bg-white rounded-md">
                                <div class="space-y-1 border-b">
                                    <span class="text-xs font-semibold"
                                        >Delevery Method</span
                                    >
                                    <p class="text-xs text-gray-500">
                                        Payment on delevery
                                    </p>
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
import { computed, onMounted, ref, onBeforeUpdate } from 'vue'
import { useCurrency } from '../../../plugins/currencyPlugin'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import moment from 'moment'
export default {
    components: {},

    setup() {
        const store = useStore()
        const route = useRoute()
        const loading = ref(true)
        const currency = useCurrency()
        const showDelivered = ref(false)
        const showPayment = ref(false)
        const paymentDate = ref(moment().format('YYYY-MM-DD'))
        const deliveryDate = ref(moment().format('YYYY-MM-DD'))
        const order = ref(
            computed(() => {
                return store.state.order.order
            })
        )

        const toggleDelivered = (params) => {
            if (order.value.deliveryStatus === 'pending')
                showDelivered.value = !showDelivered.value
        }
        const togglePayment = (params) => {
            if (order.value.paymentStatus === 'pending')
                showPayment.value = !showPayment.value
        }

        const addDelivered = (params) => {
            if (order.value.deliveryStatus === 'pending') {
                const obj = {
                    orderId: order.value.orderId,
                    deliveryStatus: 'Delivered',
                    deliveryDate: new Date(deliveryDate.value),
                }
                store.dispatch('order/updateOrderDeliveryStatus', obj)
            }
            showDelivered.value = !showDelivered.value
        }

        const addPayment = (params) => {
            if (order.value.paymentStatus === 'pending') {
                const obj = {
                    orderId: order.value.orderId,
                    paymentStatus: 'Paid',
                    paymentDate: new Date(paymentDate.value),
                }
                store.dispatch('order/updateOrderPaymentStatus', obj)
            }
            showPayment.value = !showPayment.value
        }

        onMounted(async (params) => {
            await store.dispatch('order/getOrderById', route.query.orderId)
            loading.value = false
        })
        return {
            order,
            loading,
            route,
            showDelivered,
            showPayment,
            toggleDelivered,
            togglePayment,
            addDelivered,
            addPayment,
            deliveryDate,
            paymentDate,
            currency,
        }
    },
}
</script>

<style>
@media screen and (max-width: 768px) {
    .width568 {
        width: 568px;
        min-width: 568px;
    }
}
</style>
