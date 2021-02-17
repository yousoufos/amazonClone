<template>
    <div class="bg-gray-200 rounded">
        <div class="px-2 xl:px-2 text-left">
            <p class="font-bold text-l">
                {{ product.title }}
            </p>
            <p>
                <strong> {{ currency.$t(product.price) }} </strong>
            </p>
            <p
                class="font-semibold text-sm"
                :class="[
                    { 'text-green-500': product.stock > 0 },
                    { 'text-red-500': product.stock === 0 },
                ]"
            >
                {{ product.stock > 0 ? 'En Stock' : 'Rupture de Stock' }}
            </p>
            <!-- <p class="py-2 text-sm">{{ product.description }}</p> -->
            <div class="flex justify-center">
                <p class="" v-for="n in product.rating">⭐</p>
            </div>
            <img
                class="xl:w-56 xl:h-56 mx-auto my-auto"
                :src="product.defaultPicture"
                alt=""
            />
        </div>
        <div class="text-center my-5 flex">
            <button
                :disabled="product.stock === 0"
                :class="{ 'disabled:opacity-50': product.stock === 0 }"
                @click="add"
                class="btnOrange mr-2"
            >
                Add to cart
            </button>
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
import { useRouter, useRoute } from 'vue-router'
import { useCurrency } from '../plugins/currencyPlugin'

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
        const route = useRoute()
        const currency = useCurrency()

        const add = () => {
            if (props.product.stock > 0) {
                store.dispatch('cart/addToCart', props.product)
            }
        }
        const detail = () => {
            router.push({
                name: 'ProductDetails',
                query: {
                    productId:
                        route.name === 'searchResult'
                            ? props.product.objectID
                            : props.product.productId,
                },
            })
        }
        return { add, detail, currency }
    },
}
</script>

<style></style>
