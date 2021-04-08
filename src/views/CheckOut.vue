<template>
    <div v-if="loading"><Spin /></div>
    <div v-else>
        <div class="hidden lg:flex lg:w-4/5 lg:mx-auto lg:mt-10 lg:px-4">
            <div class="lg:w-8/12">
                <div @click="deleting" v-if="from.length > 0">
                    <router-link :to="from[from.length - 1]"
                        ><span class="text-4xl material-icons">
                            keyboard_backspace
                        </span></router-link
                    >
                </div>
                <p
                    class="lg:mb-10 lg:py-3 lg:text-2xl lg:font-bold lg:border-b-2"
                >
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
            <div class="flex flex-col w-4/12 ml-10 bg-gray-200 rounded-md">
                <p class="p-10 text-lg font-semibold">
                    Subtotal ({{ count }} items ) :
                    <span class="font-bold">{{ currency.$t(total) }}</span>
                </p>
                <button
                    @click="proceed"
                    class="px-4 mx-auto font-semibold bg-yellow-500"
                    :disabled="count === 0"
                    :class="{ 'disabled:opacity-50': count === 0 }"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
        <div class="flex flex-col lg:hidden">
            <div @click="deleting" v-if="from.length > 0">
                <router-link :to="from[from.length - 1]"
                    ><span class="text-4xl material-icons">
                        keyboard_backspace
                    </span></router-link
                >
            </div>
            <div v-if="count === 0">
                <img src="../assets/empty-cart.png" alt="" />
            </div>
            <div class="m-4">
                <div class="">
                    <product
                        class="mb-2 bg-gray-100 rounded-lg"
                        @qteUpdated="update"
                        v-for="item in cart.items"
                        :key="item.productId"
                        :product="item"
                        :total="total"
                    ></product>
                </div>
            </div>
            <div class="bg-gray-100">
                <div
                    class="flex justify-between px-4 py-2 font-sans font-medium"
                >
                    <span>Total</span
                    ><span class="font-bold text-yellow-500">{{
                        currency.$t(total)
                    }}</span>
                </div>
                <div class="mx-2">
                    <button
                        @click="proceed"
                        class="w-full h-10 font-bold bg-yellow-500 rounded-lg"
                        :disabled="count === 0"
                        :class="{ 'disabled:opacity-50': count === 0 }"
                    >
                        Proceed to checkout
                    </button>
                </div>
                <div class="mx-2 mt-2">
                    <button
                        @click="back"
                        class="w-full h-10 font-bold bg-gray-300 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import product from '../components/ProductCheckOut'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import store from '@/store'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useCurrency } from '../plugins/currencyPlugin.js'
export default {
    components: { product },
    setup(props) {
        const store = useStore()
        const router = useRouter()
        const cart = ref(computed(() => store.state.cart.cart))
        const total = ref(computed(() => store.getters['cart/total']))
        const count = ref(
            computed(() => {
                return store.state.cart.cart.items.length
            })
        )
        const currency = useCurrency()
        const loading = ref(true)
        const update = ref(({ qte, productId }) => {
            store.dispatch('cart/updateQuantity', {
                total: total.value,
                qte,
                productId: productId,
            })
        })
        const proceed = ref(() => {
            router.push({ name: 'CheckOutProceed' })
        })
        const back = ref(() => router.push('/'))
        const from = ref(
            computed((params) => {
                if (typeof store.state.navigation.from === 'undefined') {
                    return []
                } else {
                    return store.state.navigation.from
                }
            })
        )
        const deleting = (params) => {
            store.commit('navigation/removeFrom')
        }
        onMounted(async (params) => {
            await store.dispatch(
                'cart/getUserCart',
                store.getters['auth/user'].userId
            )
            loading.value = false
        })

        return {
            cart,
            total,
            count,
            update,
            proceed,
            back,
            currency,
            from,
            deleting,
            loading,
        }
    },
    /* async beforeRouteEnter(to, from, next) {
        await store.dispatch(
            'cart/getUserCart',
            store.getters['auth/user'].userId
        )
        next()
    }, */
}
</script>

<style></style>
