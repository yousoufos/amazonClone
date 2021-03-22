<template>
    <div class="bg-gray-200 rounded">
        <div class="px-2 text-left xl:px-2">
            <p class="font-bold text-l">
                {{ product.title }}
            </p>
            <p>
                <strong> {{ currency.$t(product.price) }} </strong>
            </p>
            <p
                class="text-sm font-semibold"
                :class="[
                    { 'text-green-500': product.stock > 0 },
                    { 'text-red-500': product.stock === 0 },
                ]"
            >
                {{ product.stock > 0 ? 'En Stock' : 'Rupture de Stock' }}
            </p>
            <!-- <p class="py-2 text-sm">{{ product.description }}</p> -->
            <div class="flex justify-center">
                <div class="flex space-x-1 text-gray-400">
                    <span
                        v-for="item in 5"
                        class="w-4 h-4 material-icons"
                        :class="{
                            'text-yellow-500':
                                item <=
                                Math.round(
                                    product.rating / product.reviewNumber
                                ),
                        }"
                    >
                        grade
                    </span>
                </div>
            </div>
            <img
                class="mx-auto my-auto mt-4 xl:w-56 xl:h-56"
                :src="product.defaultPicture"
                alt=""
            />
        </div>
        <div class="flex my-5 text-center">
            <button
                :disabled="product.stock === 0"
                :class="{ 'disabled:opacity-50': product.stock === 0 }"
                @click="add"
                class="mr-2 btnOrange"
            >
                Add to cart
            </button>
            <button
                @click="detail"
                class="font-semibold bg-green-500 rounded-sm w-36"
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
        console.log(props.product)
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
