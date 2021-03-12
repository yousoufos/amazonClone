<template>
    <div class="flex">
        <div><sidebar :selected="selected"></sidebar></div>
        <div class="flex w-full">
            <div class="w-full h-screen overflow-y-auto width568">
                <div v-if="loading">Loading...</div>
                <div v-else class="flex flex-col w-11/12 py-4 mx-auto">
                    <router-link to="/admin/product/newProduct">
                        <div
                            class="flex justify-center w-48 py-2 mb-4 space-x-2 bg-gray-300 rounded-md cursor-pointer"
                        >
                            <span class="material-icons">
                                add_circle_outline
                            </span>
                            <span>New Product</span>
                        </div>
                    </router-link>
                    <Pagination
                        ref="child"
                        :pas="5"
                        type="products"
                        :data="products"
                    ></Pagination>
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div
                            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                        >
                            <div
                                class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
                            >
                                <table
                                    class="min-w-full divide-y divide-gray-200"
                                    :class="{ 'flex-row': toggle }"
                                >
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Reference
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Title
                                            </th>
                                            <th
                                                @click="sortByPrice"
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                                            >
                                                <div
                                                    class="flex items-center space-x-1"
                                                >
                                                    <span>Price</span>
                                                    <span
                                                        class="material-icons"
                                                    >
                                                        sort
                                                    </span>
                                                </div>
                                            </th>
                                            <th
                                                @click="sortByStock"
                                                scope="col"
                                                class="flex items-center px-6 py-3 space-x-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                                            >
                                                <span>Stock</span>
                                                <span class="material-icons">
                                                    sort
                                                </span>
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Picture
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="bg-white divide-y divide-gray-200"
                                    >
                                        <tr
                                            v-for="product in tab"
                                            :key="product.productId"
                                        >
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                {{ product.productId }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                {{ product.title }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                {{ currency.$t(product.price) }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                <span
                                                    :class="{
                                                        'bg-red-500 rounded-lg px-4 text-white ':
                                                            product.stock === 0,
                                                    }"
                                                    >{{ product.stock }}</span
                                                >
                                            </td>
                                            <td
                                                class="flex w-56 px-6 py-4 space-x-1 overflow-auto text-sm text-gray-500"
                                            >
                                                <div
                                                    v-if="
                                                        product.categories
                                                            .length !== 0
                                                    "
                                                    v-for="item in product.categories"
                                                    :key="item.id"
                                                    class="flex px-2 mt-3 bg-green-400 rounded-lg flex-nowrap"
                                                >
                                                    {{ item.name }}
                                                </div>
                                                <div v-else>No categories</div>
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                <img
                                                    class="w-12 h-12"
                                                    :src="
                                                        product.defaultPicture ===
                                                        ''
                                                            ? require('../../../assets/no-image.jpg')
                                                            : product.defaultPicture
                                                    "
                                                    alt=""
                                                />
                                            </td>
                                            <td
                                                class="flex px-6 py-4 space-x-2 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                <span
                                                    @click="remove(product)"
                                                    class="text-red-500 cursor-pointer material-icons"
                                                >
                                                    delete_forever
                                                </span>
                                                <span
                                                    @click="edit(product)"
                                                    class="cursor-pointer material-icons"
                                                >
                                                    edit
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '../../../components/admin/navbar'
import sidebar from '../../../components/admin/sidebar'
import spin from '../../../components/Spin'
import Pagination from '../../../components/Pagination'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { storage } from '../../../firebase'
import { useRouter } from 'vue-router'
import { useCurrency } from '../../../plugins/currencyPlugin'
export default {
    components: {
        navbar,
        sidebar,
        spin,
        Pagination,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const currency = useCurrency()
        const toggle = ref(true)
        const selected = ref('Product')
        const loading = ref(true)
        const sortByStockValue = ref('DESC')
        const sortByPriceValue = ref('DESC')
        const products = ref(
            computed(() => {
                return store.state.product.tab
            })
        )

        const removePicture = (item) => {
            var httpsReference = storage.refFromURL(item)
            httpsReference
                .delete()
                .then()
                .catch(function (error) {
                    console.log(error)
                })
        }

        const removeAllPictures = (product) => {
            if (product.pictures.length !== 0) {
                product.pictures.forEach((item) => {
                    removePicture(item)
                })
            }
        }
        const remove = (product) => {
            if (confirm('Do you really want to remove this product')) {
                removeAllPictures(product)
                store.dispatch('product/removeProduct', product.productId)
                console.log('Delete succeful')
            } else {
                return
            }
        }

        const edit = (product) => {
            router.push({
                name: 'editProduct',
                query: { productId: product.productId },
            })
        }
        const sortByStock = (params) => {
            sortType.value = 'stock'
            /* if (sortByStockValue.value === 'DESC') {
                store.commit('product/sortByStock', 'DESC')
                sortByStockValue.value = 'ASC'
                return
            }
            if (sortByStockValue.value === 'ASC') {
                store.commit('product/sortByStock', 'ASC')
                sortByStockValue.value = 'DESC'
                return
            } */
        }
        const sortByPrice = (params) => {
            sortType.value = 'price'
            /* if (sortByPriceValue.value === 'DESC') {
                store.commit('product/sortByPrice', 'DESC')
                sortByPriceValue.value = 'ASC'
                return
            }
            if (sortByPriceValue.value === 'ASC') {
                store.commit('product/sortByPrice', 'ASC')
                sortByPriceValue.value = 'DESC'
                return
            } */
        }
        const sortType = ref('')
        const tab = computed(() => {
            var obj = store.getters['navigation/getProductsPagination']
            if (sortType.value === 'stock') {
                if (sortByStockValue.value === 'DESC') {
                    sortByStockValue.value = 'ASC'
                    sortType.value = ''
                    return obj.sort((a, b) => {
                        return b.stock - a.stock
                    })
                }
                if (sortByStockValue.value === 'ASC') {
                    sortByStockValue.value = 'DESC'
                    sortType.value = ''

                    return obj.sort((a, b) => {
                        return a.stock - b.stock
                    })
                }
            }
            if (sortType.value === 'price') {
                if (sortByPriceValue.value === 'DESC') {
                    sortByPriceValue.value = 'ASC'
                    sortType.value = ''
                    return obj.sort((a, b) => {
                        return b.price - a.price
                    })
                }
                if (sortByPriceValue.value === 'ASC') {
                    sortByPriceValue.value = 'DESC'
                    sortType.value = ''
                    return obj.sort((a, b) => {
                        return a.price - b.price
                    })
                }
            }

            return store.getters['navigation/getProductsPagination']
        })

        onMounted(async () => {
            //await store.dispatch('product/getProducts')
            loading.value = false
        })

        return {
            products,
            toggle,
            selected,
            loading,
            remove,
            edit,
            sortByStock,
            sortByStockValue,
            sortByPriceValue,
            sortByPrice,
            currency,
            tab,
        }
    },
}
</script>

<style>
@media screen and (max-width: 768px) {
    .width655px {
        width: 768px;
    }
}
</style>
