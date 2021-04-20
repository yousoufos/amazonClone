<template>
    <div class="pb-4 bg-gray-200 lg:bg-gray-100">
        <div class="flex items-center justify-center h-screen" v-if="loading">
            <Spin />
        </div>
        <div v-else class="flex flex-col mx-auto lg:w-10/12">
            <div class="flex px-10" @click="deleting" v-if="from.length > 0">
                <router-link :to="from[from.length - 1]"
                    ><span class="text-4xl material-icons">
                        keyboard_backspace
                    </span></router-link
                >
            </div>
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
            <!-- <div class="bg-blue-700">
                <img :src="require('../assets/informatiqueBanner.jpg')" alt="" />
            </div> -->
            <!-- <div class="px-2 py-2">
                <p class="font-light tracking-normal text-gray-700 uppercase">
                    {{ categorie.name }} 
                </p>
            </div> -->
            <div class="py-1 mx-auto">
                <img :src="require('../assets/banner_soldes.jpg')" alt="" />
            </div>
            <div class="flex lg:space-x-2">
                <div class="flex flex-col w-full">
                    <div
                        class="flex items-center justify-between py-2 mb-2 bg-white"
                    >
                        <div class="">
                            <p
                                class="hidden px-2 font-light tracking-normal text-gray-700 uppercase lg:flex"
                            >
                                Promotions
                            </p>
                        </div>
                        <div class="flex items-center space-x-6">
                            <div class="flex items-center space-x-2">
                                <label class="block" for="sort">Sort By</label>
                                <div>
                                    <select
                                        v-model="sortBy"
                                        class="border-gray-300 rounded-lg"
                                        name="sort"
                                        id="sort"
                                    >
                                        <option value>Please Select</option>
                                        <option value="price">
                                            Sort By Price
                                        </option>
                                        <option value="rating">
                                            Sort By Rating
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex p-2 text-gray-700">
                                <span
                                    @click="toggleGrid"
                                    class="mr-4 cursor-pointer material-icons"
                                    :class="{
                                        'text-yellow-500': grid === true,
                                    }"
                                >
                                    grid_view
                                </span>
                                <span
                                    @click="toggleGrid"
                                    class="cursor-pointer material-icons"
                                    :class="{
                                        'text-yellow-500': grid === false,
                                    }"
                                >
                                    view_stream
                                </span>
                            </div>
                        </div>
                    </div>
                    <Pagination
                        ref="child"
                        :pas="12"
                        type="promotion"
                        :data="products"
                    />
                    <div v-if="!grid" class="flex flex-col w-full space-y-2">
                        <div>
                            <div
                                @click="detail(product)"
                                class="flex bg-white rounded-md cursor-pointer h-36 lg:h-48 lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-95 lg:hover:shadow-md"
                                v-for="product in tab"
                                :key="product.productId"
                            >
                                <div class="w-1/4 my-auto ml-6">
                                    <img
                                        class="object-contain w-24 h-24 lg:w-36 lg:h-36"
                                        :src="product.defaultPicture"
                                        alt=""
                                    />
                                </div>
                                <div class="flex flex-col w-2/4 p-4">
                                    <div>
                                        <p class="mt-4">{{ product.title }}</p>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="flex text-gray-400">
                                            <span
                                                v-for="(item, index) in 5"
                                                :key="index"
                                                class="text-xs material-icons lg:text-sm"
                                                :class="{
                                                    'text-yellow-500':
                                                        item <=
                                                        Math.round(
                                                            product.rating /
                                                                product.reviewNumber
                                                        ),
                                                }"
                                            >
                                                grade
                                            </span>
                                        </div>
                                        <div>
                                            <p
                                                class="px-2 text-sm text-gray-400"
                                            >
                                                {{
                                                    '(' +
                                                    product.reviewNumber +
                                                    ')'
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                                <div class="flex flex-col w-1/4 text-right">
                                    <div class="flex-grow">
                                        <p
                                            class="px-2 mt-12 text-sm text-gray-900 line-through lg:p-4 lg:mt-1"
                                        >
                                            {{ currency.$t(product.price) }}
                                        </p>
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <p
                                                class="text-xs font-light text-gray-700 lg:font-bold lg:text-lg"
                                            >
                                                {{
                                                    currency.$t(
                                                        product.newPrice
                                                    )
                                                }}
                                            </p>
                                            <p
                                                class="px-1 text-xs bg-yellow-500 rounded-md"
                                            >
                                                -{{
                                                    Math.round(
                                                        ((1 -
                                                            product.newPrice /
                                                                product.price) *
                                                            100 +
                                                            Number.EPSILON) *
                                                            100
                                                    ) / 100
                                                }}%
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            @click="add(product)"
                                            class="w-full mb-2 text-sm bg-yellow-500 rounded-sm lg:px-8 lg:py-1 text-gray-50 lg:font-semibold"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="">
                        <div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
                            <div
                                v-for="product in tab"
                                :key="product.productId"
                                class="flex flex-col cursor-pointer lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105 lg:hover:shadow-md"
                            >
                                <div class="">
                                    <div
                                        @click="detail(product)"
                                        class="flex flex-col px-2 text-left bg-gray-100 rounded h-72 lg:h-96 xl:px-2 lg:bg-white"
                                    >
                                        <div class="py-2">
                                            <img
                                                class="object-contain mx-auto w-36 h-36 lg:w-56 lg:h-56"
                                                :src="product.defaultPicture"
                                                alt=""
                                            />
                                        </div>
                                        <div class="flex flex-col mt-2">
                                            <p
                                                class="text-xs font-light text-gray-700 lg:font-bold lg:text-l"
                                            >
                                                {{ product.title }}
                                            </p>
                                            <div class="flex items-center">
                                                <div class="flex text-gray-400">
                                                    <span
                                                        v-for="(
                                                            item, index
                                                        ) in 5"
                                                        :key="index"
                                                        class="text-xs material-icons lg:text-sm"
                                                        :class="{
                                                            'text-yellow-500':
                                                                item <=
                                                                Math.round(
                                                                    product.rating /
                                                                        product.reviewNumber
                                                                ),
                                                        }"
                                                    >
                                                        grade
                                                    </span>
                                                </div>
                                                <div>
                                                    <p
                                                        class="px-2 text-sm text-gray-400"
                                                    >
                                                        {{
                                                            '(' +
                                                            product.reviewNumber +
                                                            ')'
                                                        }}
                                                    </p>
                                                </div>
                                            </div>
                                            <p
                                                class="text-sm text-gray-900 line-through lg:px-2 lg:mt-1"
                                            >
                                                {{ currency.$t(product.price) }}
                                            </p>
                                            <div
                                                class="flex items-center space-x-2"
                                            >
                                                <p
                                                    class="text-xs font-light text-gray-700 lg:font-bold lg:text-lg"
                                                >
                                                    {{
                                                        currency.$t(
                                                            product.newPrice
                                                        )
                                                    }}
                                                </p>
                                                <p
                                                    class="px-1 text-xs bg-yellow-500 rounded-md"
                                                >
                                                    -{{
                                                        Math.round(
                                                            ((1 -
                                                                product.newPrice /
                                                                    product.price) *
                                                                100 +
                                                                Number.EPSILON) *
                                                                100
                                                        ) / 100
                                                    }}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <button
                                        @click="add(product)"
                                        class="w-full bg-yellow-500 rounded-sm shadow-sm text-gray-50"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useCurrency } from '../plugins/currencyPlugin'
import ProductHome from '../components/ProductHome'

export default {
    components: {
        ProductHome,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const loading = ref(true)
        const child = ref(null)
        const sortBy = ref('')
        const currency = useCurrency()
        const products = computed((params) => {
            let t = []
            store.getters['promotion/getAlivePromotions'].forEach(
                (promotion) => {
                    promotion.productsList.forEach((product) => {
                        t.push(product)
                    })
                }
            )
            return t
        })

        const notification = computed(() => {
            if (store.state.notification.notification) {
                return store.state.notification.notification
            } else {
                return { message: '', type: '', show: false }
            }
        })

        const add = (product) => {
            if (product.stock > 0) {
                store.dispatch('cart/addToCart', {
                    ...product,
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
            await store.dispatch('promotion/getPromotions', route.query.id)
            loading.value = false
        })

        const grid = ref(true)
        const toggleGrid = (params) => {
            grid.value = !grid.value
        }
        const showAdd = (params) => {}

        const from = ref(
            computed((params) => {
                if (typeof store.state.navigation.from === 'undefined') {
                    return []
                } else {
                    return store.state.navigation.from
                }
            })
        )
        const deleting = (params) => {
            store.commit('navigation/removeFrom')
        }
        const tab = computed((params) => {
            var obj = store.getters['navigation/getPromotionPagination']

            if (sortBy.value === 'price') {
                return obj.sort((a, b) => {
                    return b.price - a.price
                })
            }
            if (sortBy.value === 'rating') {
                return obj.sort((a, b) => {
                    var un = Number.isNaN(b.rating / b.reviewNumber)
                        ? 0
                        : b.rating / b.reviewNumber
                    var deux = Number.isNaN(a.rating / a.reviewNumber)
                        ? 0
                        : a.rating / a.reviewNumber

                    return un - deux
                })
            }
            return store.getters['navigation/getPromotionPagination']
        })

        return {
            products,
            currency,
            loading,
            add,
            notification,
            detail,
            grid,
            toggleGrid,
            showAdd,
            from,
            deleting,
            sortBy,
            child,
            tab,
        }
    },
}
</script>

<style></style>
