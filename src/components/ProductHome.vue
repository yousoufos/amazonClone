<template>
    <div
        @click="detail"
        class="flex flex-col px-2 text-left bg-gray-100 rounded cursor-pointer xl:px-2 lg:bg-white"
    >
        <div
            :style="{
                'background-image':
                    product.defaultPicture === ''
                        ? `url(${require('../assets/no-image.jpg')})`
                        : `url(${product.defaultPicture})`,
            }"
            class="flex-grow mx-auto bg-center bg-no-repeat bg-contain w-36 h-36 lg:w-56 lg:h-56"
        >
            <!-- <img
                class="object-cover mx-auto w-36 h-36 lg:w-56 lg:h-56"
                :src="
                    product.defaultPicture === ''
                        ? require('../assets/no-image.jpg')
                        : product.defaultPicture
                "
                alt=""
            /> -->
        </div>
        <div class="">
            <p class="text-xs font-light text-gray-700 lg:font-bold lg:text-lg">
                {{ product.title }}
            </p>
            <p
                class=""
                :class="{
                    'line-through text-sm text-gray-700':
                        product.promotion !== null,
                    'text-xs font-light text-gray-700 lg:font-bold lg:text-lg':
                        product.promotion === null,
                }"
            >
                {{ currency.$t(product.price) }}
            </p>
            <div
                v-if="product.promotion !== null"
                class="flex items-center space-x-2"
            >
                <p
                    class="text-xs font-light text-gray-700 lg:font-bold lg:text-lg"
                >
                    {{ currency.$t(product.promotion.newPrice) }}
                </p>

                <p class="bg-yellow-500 rounded-md">-{{ taux }}%</p>
            </div>
        </div>

        <!-- <p class="py-2 text-sm">{{ product.description }}</p> -->
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
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
        const taux = computed(() => {
            let num =
                (1 - props.product.promotion.newPrice / props.product.price) *
                100
            return Math.round((num + Number.EPSILON) * 100) / 100
        })

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
        const src = ref('')
        const test = (params) => {
            src.value = require('../assets/no-image.jpg')
        }
        const show = (product) => {
            src.value = product.defaultPicture
        }

        return { add, detail, currency, test, src, show, taux }
    },
}
</script>

<style></style>
