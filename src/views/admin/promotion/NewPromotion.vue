<template>
    <div class="flex">
        <div><sidebar :selected="selected"></sidebar></div>
        <div class="flex w-full">
            <div class="w-full h-screen overflow-y-auto width568">
                <div v-if="loading">Loading...</div>
                <div v-else class="relative flex flex-col w-11/12 py-4 mx-auto">
                    <CardProducts
                        @addProduct="addProduct"
                        class="z-20"
                        v-if="showCard === true"
                    ></CardProducts>
                    <div
                        @click=""
                        :class="{ 'opacity-20': showCard === true }"
                        class="z-0"
                    >
                        <div
                            class="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 space-y-10 bg-white rounded shadow-md"
                        >
                            <div class="flex space-x-4">
                                <div class="flex flex-col w-1/2">
                                    <label for="name">Promotion's name</label>
                                    <input
                                        class="bg-gray-100 rounded-lg appearance-none"
                                        type="text"
                                    />
                                </div>
                                <div class="flex flex-col w-1/2">
                                    <label for="name">Starting Date</label>
                                    <input
                                        class="bg-gray-100 rounded-lg"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div class="flex space-x-4">
                                <div class="flex flex-col w-1/2">
                                    <label for="name">Taux</label>
                                    <input
                                        class="bg-gray-100 rounded-lg"
                                        type="text"
                                    />
                                </div>
                                <div class="flex flex-col w-1/2">
                                    <label for="name">Ending Date</label>
                                    <input
                                        class="bg-gray-100 rounded-lg"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div
                                class="flex flex-col p-4 border border-gray-900 rounded-lg"
                            >
                                <div
                                    @click="showCard = !showCard"
                                    class="flex justify-center w-48 py-2 mb-4 space-x-2 bg-gray-300 rounded-md cursor-pointer"
                                >
                                    <span class="material-icons">
                                        add_circle_outline
                                    </span>
                                    <span>Add product</span>
                                </div>

                                <table
                                    class="min-w-full divide-y divide-gray-200"
                                >
                                    <thead class="bg-gray-100">
                                        <tr>
                                            <th
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Reference
                                            </th>
                                            <th
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Title
                                            </th>
                                            <th
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Old Price
                                            </th>
                                            <th
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                New Price
                                            </th>
                                            <th
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="bg-white divide-y divide-gray-200 cursor-pointer"
                                    >
                                        <tr
                                            v-for="(
                                                product, index
                                            ) in productsList"
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
                                                {{ product.price }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                45
                                            </td>
                                            <td
                                                @click="removeProduct(index)"
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                remove
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
import sidebar from '../../../components/admin/sidebar'
import spin from '../../../components/Spin'
import CardProducts from '../../../components/admin/promotion/CardProduct'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useCurrency } from '../../../plugins/currencyPlugin'
export default {
    components: {
        sidebar,
        spin,

        CardProducts,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const currency = useCurrency()
        const toggle = ref(true)
        const selected = ref('Promotion')
        const loading = ref(true)
        const showCard = ref(false)
        const productsList = ref([])
        const addProduct = (params) => {
            productsList.value.push(params)
        }
        const removeProduct = (params) => {
            productsList.value.slice(params, 1)
        }

        onMounted(async () => {
            //await store.dispatch('product/getProducts')
            loading.value = false
        })

        return {
            toggle,
            selected,
            loading,
            showCard,
            productsList,
            currency,
            addProduct,
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
