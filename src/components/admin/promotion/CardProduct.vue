<template>
    <div class="w-10/12 mt-16 bg-yellow-100 centerVH">
        <div class="w-full">
            <div class="p-4 rounded-lg shadow-lg">
                <div class="flex flex-col">
                    <div class="flex justify-end w-full">
                        <span
                            ref="exclude"
                            @click="close"
                            class="text-red-500 cursor-pointer material-icons"
                        >
                            disabled_by_default
                        </span>
                    </div>
                    <div>
                        <Pagination
                            ref="child"
                            :pas="5"
                            type="products"
                            :data="products"
                        />
                    </div>
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
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer"
                                >
                                    <div class="flex items-center space-x-1">
                                        <span>Price</span>
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
                        <tbody
                            class="bg-white divide-y divide-gray-200 cursor-pointer"
                        >
                            <tr
                                @click="add(product)"
                                v-for="product in tab"
                                :key="product.productId"
                            >
                                <td
                                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                >
                                    {{ product.productId }}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-500">
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
                                                ? require('../../../assets/no-image.jpg')
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
import { useCurrency } from '../../../plugins/currencyPlugin'
export default {
    setup(props, { emit }) {
        const store = useStore()
        const currency = useCurrency()
        const products = store.state.product.tab
        const exclude = ref()
        const checkProductInPromotion = computed(() => {
            return store.getters['promotion/getCheckProductInPromotion']
        })
        const add = (params) => {
            store.dispatch('promotion/checkProductInPromotion', params)

            if (checkProductInPromotion.value === null) {
                emit('addProduct', params)
            } else {
                alert(
                    'Product already in promotion ' +
                        checkProductInPromotion.value.name
                )
            }
        }
        const close = (params) => {
            emit('closeCard', true)
        }
        const tab = computed(() => {
            return store.getters['navigation/getProductsPagination']
        })
        return {
            products,
            currency,
            add,
            close,
            exclude,
            tab,
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
    height: 600 px;
}
</style>
