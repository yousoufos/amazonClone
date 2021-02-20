<template>
    <div>
        <Header></Header>
    </div>
    <div v-if="loading">
        <spin></spin>
    </div>

    <div v-else class="bg-gray-200">
        <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
        >
            <notif
                v-if="notification.show"
                :notification="notification"
                :show="notification.show"
            ></notif>
        </transition>
        <div class="px-10" @click="deleting" v-if="from.length > 0">
            <router-link :to="from[from.length - 1]"
                ><span class="material-icons text-4xl">
                    keyboard_backspace
                </span></router-link
            >
        </div>
        <div
            class="lg:flex lg:h-1/5 lg:py-10 lg:w-10/12 lg:mx-auto lg:rounded-lg"
        >
            <div class="lg:w-4/5 lg:m-0 lg:px-1">
                <slider :pictures="product.data.pictures"></slider>
            </div>
            <div class="bg-white p-4 lg:w-full lg:py-14">
                <p class="font-light text-sm lg:text-3xl">
                    {{ product.data.title }}
                </p>
                <p class="font-bold py-2 text-lg lg:text-4xl">
                    {{ currency.$t(product.data.price) }}
                </p>
                <div>
                    <div class="flex text-gray-400 space-x-1">
                        <span
                            v-for="item in 5"
                            class="h-4 w-4 material-icons"
                            :class="{
                                'text-yellow-500':
                                    item <=
                                    Math.round(
                                        product.data.rating /
                                            product.data.reviewNumber
                                    ),
                            }"
                        >
                            grade
                        </span>
                    </div>
                    <div>
                        <p class="px-4 mt-2 text-xs">
                            {{ product.data.reviewNumber + ' Notes' }}
                        </p>
                    </div>
                    <div class="mt-10">
                        <button
                            :disabled="product.data.stock === 0"
                            :class="{
                                'disabled:opacity-50': product.data.stock === 0,
                            }"
                            @click="add"
                            class="btnOrange mr-2"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 text-gray-600 text-sm lg:hidden">
            DETAILS DU PRODUIT
        </div>
        <div class="bg-white text-sm lg:w-10/12 lg:mx-auto">
            <div class="lg:flex hidden">
                <p class="text-gray-500 px-4 border-b w-full text-base">
                    DETAILS DU PRODUIT
                </p>
            </div>
            <div class="p-4">
                <span class="" v-html="product.data.description"></span>
            </div>
        </div>
        <div class="p-2 text-gray-600 text-sm lg:w-10/12 lg:mx-auto">
            AVIS DES UTILISATEURS
        </div>
        <div
            v-if="product.data.reviewNumber !== 0"
            class="bg-white lg:w-10/12 lg:mx-auto"
        >
            <div class="flex space-x-4 text-xs p-4 border-b">
                <div class="">
                    <p class="text-yellow-500 font-semibold">
                        {{
                            Math.round(
                                product.data.rating / product.data.reviewNumber
                            ) + '/5'
                        }}
                    </p>
                </div>
                <div>
                    <p class="">{{ product.data.reviewNumber + ' Notes' }}</p>
                </div>
            </div>
            <!--  a repeter -->
            <div
                class="border-b"
                v-for="item in productReviews"
                :key="item.reviewId"
            >
                <div class="p-2 flex justify-between">
                    <div>
                        <span
                            v-for="(n, index) in 5"
                            :key="index"
                            class="material-icons text-sm text-gray-500"
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
                        <span class="material-icons text-sm">
                            verified_user
                        </span>
                        <p class="">Achat verifié</p>
                    </div>
                </div>
            </div>
            <div v-if="product.data.reviewNumber === 0">
                <p>Pad d'avis pour ce produit</p>
            </div>
        </div>
    </div>
    <div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import spin from '../components/Spin'
import slider from '../components/slider'
import Footer from '../components/bas.vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'
import { useCurrency } from '../plugins/currencyPlugin'
import notif from '../components/notif'

export default {
    components: { Header, spin, slider, Footer, notif },
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
            if (product.value.data.stock > 0) {
                store.dispatch('cart/addToCart', {
                    productId: product.value.productId,
                    title: product.value.data.title,
                    description: product.value.data.description,
                    price: product.value.data.price,
                    defaultPicture: product.value.data.defaultPicture,
                    rating: product.value.data.rating,
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
