<template>
    <navBar></navBar>
    <div class="mt-10 px-4">
        <div class="flex">
            <div class="w-2/3">
                <p class="mb-10 py-3 text-2xl font-bold border-b-2">
                    Your Shopping Cart :
                </p>
                <product
                    @qteUpdated="update"
                    v-for="item in cart"
                    :key="item.productId"
                    :product="item"
                ></product>
            </div>
            <div class="flex flex-col bg-gray-200 w-1/3 h-40 ml-10">
                <p class="p-10 text-lg font-semibold">
                    Subtotal ({{ count }} items ) :
                    <span class="font-bold">{{ total }}</span>
                </p>
                <button class="font-semibold bg-yellow-500 w-1/2 mx-auto">
                    Proceed to CheckOut
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import navBar from '../components/Header'
import Product from '../components/Product.vue'
import product from '../components/ProductCheckOut'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import store from '@/store'

export default {
    components: { navBar, product },
    setup() {
        const store = useStore()
        const cart = ref(computed(() => store.state.cart.cart))
        const total = ref(computed(() => store.getters['cart/total']))
        const count = ref(computed(() => store.state.cart.cart.length))
        const update = ref((qte) => {
            store.dispatch('cart/updateQuantity', total.value)
            console.log(qte)
        })
        return { cart, total, count, update }
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch('cart/getUserCart', store.getters['auth/user'].uid)
        next()
    },
}
</script>

<style></style>
