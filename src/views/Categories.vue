<template>
    <div class="bg-gray-200 lg:bg-gray-100">
        <div v-if="loading">Loading...</div>
        <div v-else class="flex flex-col lg:w-10/12 mx-auto">
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
            <!-- <div class="bg-blue-700">
                <img :src="require('../assets/informatiqueBanner.jpg')" alt="" />
            </div> -->
            <div class="px-2 py-2">
                <p class="font-light text-gray-700 uppercase tracking-normal">
                    {{ categorie.name }} -->
                </p>
            </div>
            <div class="flex">
                <div
                    class="hidden lg:flex lg:h-screen lg:bg-green-500 lg:w-1/3"
                >
                    test
                </div>
                <div class="flex flex-col w-full space-y-2">
                    <div
                        @click="detail(product)"
                        class="h-36 lg:h-48 cursor-pointer rounded-md flex lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105 lg:hover:shadow-md bg-white"
                        v-for="product in products"
                        :key="product.data.productId"
                    >
                        <div class="w-1/4 ml-6 my-auto">
                            <img
                                class="w-24 h-24 lg:w-36 lg:h-36 object-cover"
                                :src="product.data.defaultPicture"
                                alt=""
                            />
                        </div>
                        <div class="p-4 w-2/4">
                            <p class="mt-4">{{ product.data.title }}</p>
                            <div class="flex items-center">
                                <div class="flex text-gray-400">
                                    <span
                                        v-for="(item, index) in 5"
                                        :key="index"
                                        class="material-icons text-xs lg:text-sm"
                                        :class="{
                                            'text-yellow-500':
                                                item <=
                                                Math.round(
                                                    product.data.rating /
                                                        product.data
                                                            .reviewNumber
                                                ),
                                        }"
                                    >
                                        grade
                                    </span>
                                </div>
                                <div>
                                    <p class="text-gray-400 px-2 text-sm">
                                        {{
                                            '(' +
                                            product.data.reviewNumber +
                                            ')'
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/4 text-right flex flex-col">
                            <div class="flex-grow">
                                <p
                                    class="mt-12 px-2 lg:p-4 lg:text-xl lg:mt-4 lg:font-semibold text-gray-900"
                                >
                                    {{ currency.$t(product.data.price) }}
                                </p>
                            </div>
                            <div>
                                <button
                                    @click="add(product)"
                                    class="bg-yellow-500 w-full text-sm lg:px-8 lg:py-1 rounded-md mb-2 text-gray-50 lg:font-semibold"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useCurrency } from '../plugins/currencyPlugin'
import notif from '../components/notif'
export default {
    components: {
        notif,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const loading = ref(true)
        const currency = useCurrency()
        const categorie = computed((params) => {
            return store.state.category.categorie
        })
        const products = computed((params) => {
            return store.state.product.productCategories
        })
        const notification = computed(() => {
            if (store.state.notification.notification) {
                return store.state.notification.notification
            } else {
                return { message: '', type: '', show: false }
            }
        })

        const add = (product) => {
            if (product.data.stock > 0) {
                store.dispatch('cart/addToCart', {
                    ...product.data,
                    productId: product.productId,
                })
            }
        }
        const detail = (product) => {
            router.push({
                name: 'ProductDetails',
                query: {
                    productId:
                        route.name === 'searchResult'
                            ? product.objectID
                            : product.productId,
                },
            })
        }

        onMounted(async (params) => {
            await store.dispatch('category/getCategorieById', route.query.id)
            await store.dispatch('product/getCategorieProduct', route.query.id)
            loading.value = false
        })

        return {
            categorie,
            products,
            currency,
            loading,
            add,
            notification,
            detail,
        }
    },
}
</script>

<style></style>
