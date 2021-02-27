<template>
    <div class="">
        <div>
            <navbar title="Products List"></navbar>
        </div>
        <div class="flex">
            <div><sidebar :selected="selected"></sidebar></div>

            <div class="width568 w-full">
                <div v-if="loading">Loading...</div>
                <div v-else class="py-4 mx-auto flex flex-col w-11/12">
                    <router-link to="/admin/product/newProduct">
                        <div
                            class="flex w-48 mb-4 space-x-2 justify-center rounded-md py-2 bg-gray-300 cursor-pointer"
                        >
                            <span class="material-icons">
                                add_circle_outline
                            </span>
                            <span>New Product</span>
                        </div>
                    </router-link>
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div
                            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
                        >
                            <div
                                class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                            >
                                <table
                                    class="min-w-full divide-y divide-gray-200"
                                    :class="{ 'flex-row': toggle }"
                                >
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Reference
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Title
                                            </th>
                                            <th
                                                @click="sortByPrice"
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                                                class="flex items-center space-x-1 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            >
                                                <span>Stock</span>
                                                <span class="material-icons">
                                                    sort
                                                </span>
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Picture
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {{ product.productId }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {{ product.title }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                {{ currency.$t(product.price) }}
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
                                                class="px-6 py-4 text-sm text-gray-500 flex space-x-1 w-56 overflow-auto"
                                            >
                                                <div
                                                    v-if="
                                                        product.categories
                                                            .length !== 0
                                                    "
                                                    v-for="item in product.categories"
                                                    :key="item.id"
                                                    class="bg-green-400 rounded-lg px-2 mt-3 flex flex-nowrap"
                                                >
                                                    {{ item.data.name }}
                                                </div>
                                                <div v-else>No categories</div>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2"
                                            >
                                                <span
                                                    @click="remove(product)"
                                                    class="material-icons cursor-pointer text-red-500"
                                                >
                                                    delete_forever
                                                </span>
                                                <span
                                                    @click="edit(product)"
                                                    class="material-icons cursor-pointer"
                                                >
                                                    edit
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center">
                                    <div
                                        @click="next(index + 1)"
                                        class="border p-1 mx-1 mt-4 border-indigo-600 cursor-pointer"
                                        :class="{
                                            'bg-yellow-500': item === start,
                                        }"
                                        v-for="(item, index) in numberRecords"
                                        :key="index"
                                    >
                                        {{ item }}
                                    </div>
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
import navbar from '../../../components/admin/navbar'
import sidebar from '../../../components/admin/sidebar'
import spin from '../../../components/Spin'
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
                .then(console.log('pictures removed'))
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
            if (sortByStockValue.value === 'DESC') {
                store.commit('product/sortByStock', 'DESC')
                sortByStockValue.value = 'ASC'
                return
            }
            if (sortByStockValue.value === 'ASC') {
                store.commit('product/sortByStock', 'ASC')
                sortByStockValue.value = 'DESC'
                return
            }
        }
        const sortByPrice = (params) => {
            if (sortByPriceValue.value === 'DESC') {
                store.commit('product/sortByPrice', 'DESC')
                sortByPriceValue.value = 'ASC'
                return
            }
            if (sortByPriceValue.value === 'ASC') {
                store.commit('product/sortByPrice', 'ASC')
                sortByPriceValue.value = 'DESC'
                return
            }
        }

        const pas = ref(6)
        const productsLength = computed(() => {
            return products.value.length
        })
        const numberRecords = computed(() => {
            return Math.ceil(productsLength.value / pas.value)
        })
        var start = ref(1)
        const tab = computed(() => {
            var indexStart = (start.value - 1) * pas.value

            var tableau = []

            for (var i = indexStart; i < indexStart + pas.value; i++) {
                if (typeof products.value[i] !== 'undefined') {
                    tableau.push(products.value[i])
                }
            }

            return tableau
        })
        const next = (params) => {
            start.value = params
        }

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
            numberRecords,
            tab,
            next,
            start,
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
