<template>
    <div
        class="flex flex-col px-2 xl:px-2 text-left bg-gray-100 lg:bg-white rounded"
    >
        <div class="flex-grow">
            <img
                class="mx-auto w-36 h-36 lg:w-56 lg:h-56 object-cover"
                :src="product.defaultPicture"
                alt=""
            />
        </div>
        <div class="">
            <p class="text-gray-700 text-xs font-light lg:font-bold lg:text-l">
                {{ product.title }}
            </p>
            <p class="text-gray-700 text-xs font-light lg:font-bold lg:text-l">
                {{ currency.$t(product.price) }}
            </p>
        </div>

        <!-- <p class="py-2 text-sm">{{ product.description }}</p> -->
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
