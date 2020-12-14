<template>
    <div class="m-1 flex-1 bg-white">
        <div class="px-2 xl:px-2 text-left">
            <p class="font-bold text-xl">{{ product.title }}</p>
            <p>
                <small>$ </small><strong>{{ product.price }}</strong>
            </p>
            <p class="py-2 text-sm">{{ product.description }}</p>
            <div class="flex justify-center">
                <p class="" v-for="n in product.rating">⭐</p>
            </div>
            <img
                class="xl:w-60 xl:h-60 mx-auto"
                :src="require(`../assets/${product.picture}`)"
                alt=""
            />
        </div>
        <div class="text-center mb-2">
            <button @click="add" class="btnOrange">Add to cart</button>
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
    setup(props) {
        const store = useStore()
        const add = () => store.dispatch('cart/addToCart', props.product)

        return { add }
    },
}
</script>

<style></style>
