<template>
    <div class="flex mb-10 border-b-2">
        <div class="w-1/5">
            <img
                class="w-36 h-36"
                :src="require(`../assets/${product.picture}`)"
                alt=""
            />
        </div>
        <div class="w-3/5">
            <p class="font-bold">{{ product.title }}</p>
            <p>{{ product.description }}</p>
            <p class="font-bold">$ {{ product.price }}</p>
            <div class="flex">
                <p class="mb-2" v-for="n in product.rating">⭐</p>
            </div>
            <button @click="remove(product.productId)" class="btnOrange">
                Remove from cart
            </button>
        </div>
        <div class="w-1/5">
            <div class="flex py-8">
                <div class="">
                    <label class="px-2" for="">Quantity:</label>
                    <input
                        v-model="product.qte"
                        class="w-14 h-9 font-bold"
                        type="number"
                        min="0"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
    props: {
        product: Object,
    },
    setup() {
        const store = useStore()
        const remove = (productId) => {
            store.dispatch('cart/removeFromCart', productId)
        }
        return { remove }
    },
}
</script>

<style>
input[type='number']::-webkit-inner-spin-button {
    opacity: 1;
}
</style>
