<template>
    <div class="centerVH">
        <div class="w-full">
            <div class="p-4 rounded-lg shadow-lg">
                <div>
                    <table class="min-w-full divide-y divide-gray-200">
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
                                    <div class="flex items-center space-x-1">
                                        <span>Price</span>
                                        <span class="material-icons">
                                            sort
                                        </span>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Picture
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr
                                v-for="product in products"
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
                                    <img
                                        class="w-12 h-12"
                                        :src="
                                            product.defaultPicture === ''
                                                ? require('../assets/no-image.jpg')
                                                : product.defaultPicture
                                        "
                                        alt=""
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useCurrency } from '../plugins/currencyPlugin'
export default {
    setup() {
        const store = useStore()
        const currency = useCurrency()
        const products = store.state.product.tab
        return {
            products,
            currency,
        }
    },
}
</script>

<style>
.centerVH {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
