<template>
    <div class="bg-gray-200 lg:bg-gray-100">
        <div v-if="loading">Loading...</div>
        <div v-else class="flex flex-col lg:w-10/12 mx-auto">
            <div class="px-10" @click="deleting" v-if="from.length > 0">
                <router-link :to="from[from.length - 1]"
                    ><span class="material-icons text-4xl">
                        keyboard_backspace
                    </span></router-link
                >
            </div>
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
            <!-- <div class="px-2 py-2">
                <p class="font-light text-gray-700 uppercase tracking-normal">
                    {{ categorie.name }} 
                </p>
            </div> -->
            <div class="flex space-x-2">
                <div class="hidden lg:flex lg:w-1/3">
                    <img class="object-fill" :src="categorie.banniere" alt="" />
                </div>
                <div class="flex flex-col w-full">
                    <div
                        class="bg-white flex justify-between mb-2 items-center"
                    >
                        <div>
                            <p
                                class="px-2 font-light text-gray-700 uppercase tracking-normal"
                            >
                                {{ categorie.name }}>>
                            </p>
                        </div>
                        <div class="p-2 text-gray-700">
                            <span
                                @click="toggleGrid"
                                class="mr-4 material-icons cursor-pointer"
                                :class="{ 'text-yellow-500': grid === true }"
                            >
                                grid_view
                            </span>
                            <span
                                @click="toggleGrid"
                                class="material-icons cursor-pointer"
                                :class="{ 'text-yellow-500': grid === false }"
                            >
                                view_stream
                            </span>
                        </div>
                    </div>
                    <Pagination
                        ref="child"
                        :pas="3"
                        type="products"
                        :data="products"
                    ></Pagination>
                    <div v-if="!grid" class="flex flex-col w-full space-y-2">
                        <div
                            @click="detail(product)"
                            class="h-36 lg:h-48 cursor-pointer rounded-md flex lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-95 lg:hover:shadow-md bg-white"
                            v-for="product in tab"
                            :key="product.data.productId"
                        >
                            <div class="w-1/4 ml-6 my-auto">
                                <img
                                    class="w-24 h-24 lg:w-36 lg:h-36 object-cover"
                                    :src="product.data.defaultPicture"
                                    alt=""
                                />
                            </div>
                            <div class="p-4 w-2/4 flex flex-col">
                                <div>
                                    <p class="mt-4">{{ product.data.title }}</p>
                                </div>
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
                                <div></div>
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
                                        class="bg-yellow-500 w-full text-sm lg:px-8 lg:py-1 rounded-sm mb-2 text-gray-50 lg:font-semibold"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="">
                        <div class="grid grid-cols-2 gap-2 lg:grid-cols-4">
                            <div
                                @click="detail(product)"
                                v-for="product in tab"
                                :key="product.productId"
                                class="cursor-pointer lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105 lg:hover:shadow-md"
                            >
                                <div
                                    class="flex flex-col px-2 xl:px-2 text-left bg-gray-100 lg:bg-white rounded"
                                >
                                    <div class="flex-grow py-2">
                                        <img
                                            class="mx-auto w-36 h-36 lg:w-56 lg:h-56 object-cover"
                                            :src="product.data.defaultPicture"
                                            alt=""
                                        />
                                    </div>
                                    <div class="flex flex-col mt-2">
                                        <p
                                            class="text-gray-700 text-xs font-light lg:font-bold lg:text-l"
                                        >
                                            {{ product.data.title }}
                                        </p>
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
                                                                product.data
                                                                    .rating /
                                                                    product.data
                                                                        .reviewNumber
                                                            ),
                                                    }"
                                                >
                                                    grade
                                                </span>
                                            </div>
                                            <div>
                                                <p
                                                    class="text-gray-400 px-2 text-sm"
                                                >
                                                    {{
                                                        '(' +
                                                        product.data
                                                            .reviewNumber +
                                                        ')'
                                                    }}
                                                </p>
                                            </div>
                                        </div>
                                        <p
                                            class="text-gray-700 text-xs font-light lg:font-bold lg:text-l"
                                        >
                                            {{
                                                currency.$t(product.data.price)
                                            }}
                                        </p>
                                        <button
                                            @click="add(product)"
                                            class="shadow-sm mt-2 mb-2 rounded-sm w-full bg-yellow-500 text-gray-50"
                                        >
                                            Add to cart
                                        </button>
                                    </div>

                                    <!-- <p class="py-2 text-sm">{{ product.description }}</p> -->
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
import { ref, onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useCurrency } from '../plugins/currencyPlugin'
import ProductHome from '../components/ProductHome'
import notif from '../components/notif'
import Pagination from '../components/Pagination'
export default {
    components: {
        notif,
        ProductHome,
        Pagination,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const loading = ref(true)
        const child = ref(null)
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

        const grid = ref(true)
        const toggleGrid = (params) => {
            grid.value = !grid.value
        }
        const showAdd = (params) => {
            console.log('rrrrr')
        }

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
            return store.getters['navigation/getProductsPagination']
        })

        return {
            categorie,
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

            child,
            tab,
        }
    },
}
</script>

<style></style>
