<template>
    <div class="bg-white rounded">
        <div class="px-2 xl:px-2 text-left">
            <p class="font-bold text-l">
                {{ product.title }}
            </p>
            <p>
                <small>$ </small><strong>{{ product.price }}</strong>
            </p>
            <p class="py-2 text-sm">{{ product.description }}</p>
            <div class="flex justify-center">
                <p class="" v-for="n in product.rating">⭐</p>
            </div>
            <img
                class="xl:w-56 xl:h-56 mx-auto my-auto"
                :src="require(`../assets/${product.picture}`)"
                alt=""
            />
        </div>
        <div class="text-center my-5 flex">
            <button @click="add" class="btnOrange mr-2">Add to cart</button>
            <button
                @click="detail"
                class="bg-green-500 w-36 font-semibold rounded-sm"
            >
                Show
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import notif from '../components/notif'
import { useRouter } from 'vue-router'

export default {
    props: {
        product: Object,
    },
    components: {
        notif,
    },

    setup(props, { emit }) {
        const store = useStore()
        const router = useRouter()

        const add = () => {
            store.dispatch('cart/addToCart', props.product)
        }
        const detail = () => {
            router.push({
                name: 'ProductDetails',
                query: {
                    productId: props.product.productId,
                },
            })
        }
        return { add, detail }
    },
}
</script>

<style></style>
