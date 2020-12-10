<template>
    <div class="flex mb-10 border-b-2">
        <div class="ml-2">
            <img
                class="w-36 h-36"
                :src="require(`../assets/${product.picture}`)"
                alt=""
            />
        </div>
        <div class="ml-10">
            <p class="font-bold">{{ product.title }}</p>
            <p>{{ product.description }}</p>
            <p class="font-bold">$ {{ product.price }}</p>
            <div class="flex">
                <p class="mb-2" v-for="n in product.rating">⭐</p>
            </div>
            <button @click="remove(product.id)" class="btnOrange">
                Remove from cart
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
    props: {
        product: Object,
    },
    setup() {
        const store = useStore()
        const remove = (id) => {
            store.dispatch('product/removeFromCart', id)
        }
        return { remove }
    },
}
</script>

<style></style>
