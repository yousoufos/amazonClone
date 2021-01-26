<template>
    <div>
        <navBar></navBar>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-if="order.error === 'forbiden'">Forbidden access</div>
            <div
                v-else
                class="bg-gray-200 flex flex-col lg:w-1/2 lg:mx-auto lg:mt-2"
            >
                <div
                    class="hidden lg:flex lg:text-base lg:font-semibold lg:p-2"
                >
                    Your Order Details
                </div>
                <div class="bg-white p-2 my-2 tracking-wide text-sm">
                    <p class="font-semibold">Order N°: {{ order.orderId }}</p>
                    <p class="text-gray-800">Created At: {{ order.date }}</p>
                    <p class="text-gray-800">Total: {{ order.total }} TND</p>
                    <p v-if="order.paymentDate != null" class="text-gray-800">
                        Payment Date: {{ order.paymentDate }}
                    </p>
                </div>
                <div>
                    <div class="text-gray-800 p-2">
                        <p>Your articles</p>
                    </div>
                    <div class="space-y-2">
                        <div
                            v-for="item in order.items"
                            :key="item.id"
                            class="bg-white p-4 mx-2 rounded-md"
                        >
                            <div class="text-sm space-y-2 border-b">
                                <span
                                    class="p-1 text-gray-100"
                                    :class="
                                        order.deliveryStatus === 'pending'
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
                                        :src="item.defaultPicture"
                                        alt=""
                                    />
                                </div>
                                <div class="px-2 text-sm space-y-2">
                                    <p>{{ item.title }}</p>
                                    <p>Qte: {{ item.qte }}</p>
                                    <p class="font-semibold">4500 TND</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-gray-800 p-2">
                        <p>Payment</p>
                    </div>
                    <div class="bg-white p-4 mx-2 rounded-md">
                        <div class="space-y-1 border-b">
                            <span class="font-semibold text-xs"
                                >Payment Method</span
                            >
                            <p class="text-xs text-gray-500">
                                {{ order.paymentMethod }}
                            </p>
                        </div>
                        <div class="space-y-1 py-2 flex flex-col">
                            <span class="font-semibold text-xs"
                                >Payment Details</span
                            >
                            <div class="flex">
                                <span class="text-xs text-gray-500"
                                    >Total articles :
                                </span>
                                <span class="text-xs ml-2"
                                    >{{ order.total }} TND</span
                                >
                            </div>
                            <div class="flex">
                                <span class="text-xs text-gray-500"
                                    >Delevery :
                                </span>
                                <span class="text-xs ml-2">8 TND</span>
                            </div>
                            <div class="flex py-2">
                                <span class="text-xs text-gray-500"
                                    >Total :
                                </span>
                                <span class="text-xs ml-2">4508 TND</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-gray-800 p-2"><p>Delevery</p></div>
                    <div class="mx-2 p-4 bg-white rounded-md">
                        <div class="space-y-1 border-b">
                            <span class="font-semibold text-xs"
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
</template>

<script>
import navBar from '../components/Header'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default {
    components: { navBar },
    setup() {
        const store = useStore()
        const route = useRoute()
        const loading = ref(true)
        const order = ref(
            computed(() => {
                return store.state.order.order
            })
        )
        onMounted(async (params) => {
            await store.dispatch('order/getOrderById', route.query.orderId)
            loading.value = false
            console.log('mounted')
        })
        return { order, loading }
    },
}
</script>

<style></style>
