<template>
    <div v-if="loading">
        <Spin />
    </div>

    <div v-else class="pb-4 bg-gray-200">
        <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
        >
            <Notif
                v-if="notification.show"
                :notification="notification"
                :show="notification.show"
            />
        </transition>
        <div class="px-10" @click="deleting" v-if="from.length > 0">
            <router-link :to="from[from.length - 1]"
                ><span class="text-4xl material-icons">
                    keyboard_backspace
                </span></router-link
            >
        </div>
        <div
            class="lg:flex lg:h-1/5 lg:py-10 lg:w-10/12 lg:mx-auto lg:rounded-lg"
        >
            <div class="lg:w-4/5 lg:m-0 lg:px-1">
                <slider :pictures="product.pictures"></slider>
            </div>
            <div class="p-4 bg-white lg:w-full lg:py-14">
                <p class="text-sm font-light lg:text-3xl">
                    {{ product.title }}
                </p>
                <p
                    class="py-2"
                    :class="{
                        'line-through text-sm ': product.promotion !== null,
                        ' text-lg font-bold lg:text-4xl':
                            product.promotion === null,
                    }"
                >
                    {{ currency.$t(product.price) }}
                </p>
                <p
                    class="py-2 text-lg font-bold lg:text-4xl"
                    v-if="product.promotion"
                >
                    {{ currency.$t(product.promotion.newPrice) }}
                </p>
                <div>
                    <div class="flex space-x-1 text-gray-400">
                        <span
                            v-for="(item, index) in 5"
                            :key="index"
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
                    <div>
                        <p class="px-4 mt-2 text-xs">
                            {{ product.reviewNumber + ' Ratings' }}
                        </p>
                    </div>
                    <div class="mt-10">
                        <button
                            :disabled="product.stock === 0"
                            :class="{
                                'disabled:opacity-50': product.stock === 0,
                            }"
                            @click="add"
                            class="mr-2 btnOrange"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 text-sm text-gray-600 lg:hidden">PRODUCT DETAILS</div>
        <div class="text-sm bg-white lg:w-10/12 lg:mx-auto">
            <div class="hidden lg:flex">
                <p class="w-full px-4 text-base text-gray-500 border-b">
                    PRODUCT DETAILS
                </p>
            </div>
            <div class="p-4">
                <span class="" v-html="product.description"></span>
            </div>
        </div>
        <div class="p-2 text-sm text-gray-600 lg:w-10/12 lg:mx-auto">
            CUSTOMERS REVIEWS
        </div>

        <div
            v-if="product.reviewNumber !== 0"
            class="bg-white lg:w-10/12 lg:mx-auto"
        >
            <div class="flex p-4 space-x-4 text-xs border-b">
                <div class="">
                    <p class="font-semibold text-yellow-500">
                        {{
                            Math.round(product.rating / product.reviewNumber) +
                            '/5'
                        }}
                    </p>
                </div>
                <div>
                    <p class="">{{ product.reviewNumber + ' Notes' }}</p>
                </div>
            </div>
            <!--  a repeter -->
            <div
                class="border-b"
                v-for="item in productReviews"
                :key="item.reviewId"
            >
                <div class="flex justify-between p-2">
                    <div>
                        <span
                            v-for="(n, index) in 5"
                            :key="index"
                            class="text-sm text-gray-500 material-icons"
                            :class="{ 'text-yellow-500': index <= item.rating }"
                            >grade</span
                        >
                    </div>
                    <div>
                        <p class="text-sm">{{ item.date }}</p>
                    </div>
                </div>
                <div class="p-2 text-sm">
                    <p class="font-semibold">{{ item.title }}</p>
                    <p class="text-gray-900">
                        {{ item.message }}
                    </p>
                </div>
                <div class="flex justify-between p-2 text-sm">
                    <div>
                        <p class="text-gray-700">
                            Posté par {{ item.user.prenom }}
                        </p>
                    </div>
                    <div class="flex space-x-1 text-green-500">
                        <span class="text-sm material-icons">
                            verified_user
                        </span>
                        <p class="">Verified purchase</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-4 bg-white lg:w-10/12 lg:mx-auto" v-else>
            <p>No reviews yet</p>
        </div>
    </div>
</template>

<script>
import slider from '../components/slider'

import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'
import { useCurrency } from '../plugins/currencyPlugin'
import Notif from '../components/notif'

export default {
    components: { slider, Notif },
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const loading = ref(true)
        const currency = useCurrency()
        const from = ref(
            computed((params) => {
                if (typeof store.state.navigation.from === 'undefined') {
                    return []
                } else {
                    return store.state.navigation.from
                }
            })
        )
        const productReviews = ref(
            computed(() => {
                return store.state.review.productReviews
            })
        )
        const notification = ref(
            computed(() => {
                if (store.state.notification.notification) {
                    return store.state.notification.notification
                } else {
                    return { message: '', type: '', show: false }
                }
            })
        )
        const add = () => {
            if (product.value.stock > 0) {
                store.dispatch('cart/addToCart', {
                    productId: product.value.productId,
                    title: product.value.title,
                    description: product.value.description,
                    price:
                        product.value.promotion !== null
                            ? product.value.promotion.newPrice
                            : product.value.price,
                    defaultPicture: product.value.defaultPicture,
                    rating: product.value.rating,
                    qte: 1,
                })
            }
        }
        onMounted(async () => {
            if (store.getters['auth/user']) {
                await store.dispatch(
                    'cart/getUserCart',
                    store.getters['auth/user'].userId
                )
            }

            await store.dispatch(
                'product/getProductById',
                route.query.productId
            )
            await store.dispatch('review/getProductReviews', {
                productId: route.query.productId,
            })
            loading.value = false
        })

        const product = ref(
            computed(() => {
                if (store.state.product.product === null) {
                    return {
                        description: '',
                        price: '',
                        title: '',
                        rating: '',
                        defaultPicture: '',
                        pictures: [],
                    }
                } else {
                    return store.state.product.product
                }
            })
        )
        const deleting = (params) => {
            store.commit('navigation/removeFrom')
        }

        return {
            product,
            loading,
            productReviews,
            currency,
            from,
            deleting,
            add,
            notification,
        }
    },
}
</script>

<style></style>
