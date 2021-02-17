<template>
    <navBar></navBar>
    <div class="hidden lg:flex lg:w-4/5 lg:mx-auto lg:mt-10 lg:px-4">
        <div class="lg:w-8/12">
            <p class="lg:mb-10 lg:py-3 lg:text-2xl lg:font-bold lg:border-b-2">
                Your Shopping Cart :
            </p>
            <div v-if="count === 0">
                <img src="../assets/empty-cart.png" alt="" />
            </div>
            <product
                class="bg-gray-100 rounded-lg"
                @qteUpdated="update"
                v-for="item in cart.items"
                :key="item.productId"
                :product="item"
                :total="total"
            ></product>
        </div>
        <div class="flex flex-col bg-gray-200 w-4/12 h-40 ml-10">
            <p class="p-10 text-lg font-semibold">
                Subtotal ({{ count }} items ) :
                <span class="font-bold">{{ currency.$t(total) }}</span>
            </p>
            <button
                @click="proceed"
                class="px-4 font-semibold bg-yellow-500 mx-auto"
                :disabled="count === 0"
                :class="{ 'disabled:opacity-50': count === 0 }"
            >
                Proceed to Payment
            </button>
        </div>
    </div>
    <div class="flex flex-col lg:hidden">
        <div v-if="count === 0">
            <img src="../assets/empty-cart.png" alt="" />
        </div>
        <div class="m-4">
            <div class="">
                <product
                    class="bg-gray-100 mb-2 rounded-lg"
                    @qteUpdated="update"
                    v-for="item in cart.items"
                    :key="item.productId"
                    :product="item"
                    :total="total"
                ></product>
            </div>
        </div>
        <div class="bg-gray-100 h-20">
            <div class="flex px-4 py-2 font-sans font-medium justify-between">
                <span>Total</span
                ><span class="text-yellow-500 font-bold">{{ total }}</span>
            </div>
            <div class="mx-2">
                <button
                    @click="proceed"
                    class="bg-yellow-500 rounded-lg w-full h-10 font-bold"
                    :disabled="count === 0"
                    :class="{ 'disabled:opacity-50': count === 0 }"
                >
                    Proceed to checkout
                </button>
            </div>
            <div class="mt-2 mx-2">
                <button
                    @click="back"
                    class="bg-gray-300 rounded-lg w-full h-10 font-bold"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import navBar from '../components/Header'
import product from '../components/ProductCheckOut'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import store from '@/store'
import { useRouter } from 'vue-router'
import { useCurrency } from '../plugins/currencyPlugin.js'
export default {
    components: { navBar, product },
    setup(props) {
        const store = useStore()
        const router = useRouter()
        const cart = ref(computed(() => store.state.cart.cart))
        const total = ref(computed(() => store.getters['cart/total']))
        const count = ref(computed(() => store.state.cart.cart.items.length))
        const currency = useCurrency()
        const update = ref(({ qte, productId }) => {
            store.dispatch('cart/updateQuantity', {
                total: total.value,
                qte,
                productId: productId,
            })
        })
        const proceed = ref(() => router.push({ name: 'CheckOutProceed' }))
        const back = ref(() => router.push('/'))
        return { cart, total, count, update, proceed, back, currency }
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch(
            'cart/getUserCart',
            store.getters['auth/user'].userId
        )
        next()
    },
}
</script>

<style></style>
