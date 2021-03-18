<template>
    <div class="flex">
        <div><sidebar :selected="selected"></sidebar></div>
        <div class="flex w-full">
            <div class="w-full h-screen overflow-y-auto width568">
                <div v-if="loading">Loading...</div>
                <div v-else class="relative flex flex-col w-11/12 py-4 mx-auto">
                    <CardProducts
                        @addProduct="addProduct"
                        @closeCard="showCard = !showCard"
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
                                        v-model="form.name"
                                        class="bg-gray-100 rounded-lg appearance-none"
                                        type="text"
                                        name="name"
                                    />
                                </div>
                                <div class="flex flex-col w-1/2">
                                    <label for="datedebut">Starting Date</label>
                                    <input
                                        @change="dateDisabled = false"
                                        v-model="form.dateDebut"
                                        class="bg-gray-100 rounded-lg"
                                        type="date"
                                        name="datedebut"
                                    />
                                </div>
                            </div>
                            <div class="flex space-x-4">
                                <div class="flex flex-col w-1/2">
                                    <label for="taux">Taux %</label>
                                    <input
                                        v-model="form.taux"
                                        class="bg-gray-100 rounded-lg"
                                        type="number"
                                        name="taux"
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                <div class="flex flex-col w-1/2">
                                    <label for="datefin">Ending Date</label>
                                    <input
                                        v-model="form.dateFin"
                                        class="bg-gray-100 rounded-lg"
                                        type="date"
                                        name="datefin"
                                        :min="minDate"
                                        :disabled="dateDisabled"
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
                                                {{ currency.$t(product.price) }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                {{
                                                    currency.$t(
                                                        product.newPrice
                                                    )
                                                }}
                                            </td>
                                            <td
                                                @click="removeProduct(index)"
                                                class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                            >
                                                <span
                                                    class="text-red-500 material-icons"
                                                >
                                                    delete_forever
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <button
                                    @click="submit"
                                    class="w-full p-2 bg-yellow-500 rounded-md"
                                    :disabled="productsListLength"
                                    :class="{
                                        'disabled:opacity-50': productsListLength,
                                    }"
                                    type="button"
                                >
                                    Submit
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
import sidebar from '../../../components/admin/sidebar'
import spin from '../../../components/Spin'
import CardProducts from '../../../components/admin/promotion/CardProduct'
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useCurrency } from '../../../plugins/currencyPlugin'
import moment from 'moment'
export default {
    components: {
        sidebar,
        spin,

        CardProducts,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const currency = useCurrency()
        const toggle = ref(true)
        const selected = ref('Promotion')
        const loading = ref(true)
        const showCard = ref(false)
        const productsList = ref([])
        const obj = ref([])
        const dateDisabled = ref(false)
        const productsListLength = computed(() => {
            return productsList.value.length === 0 || form.name === ''
        })
        const form = reactive({
            name: '',
            taux: 0,
            dateDebut: '',
            dateFin: '',
        })
        const promotion = computed(() => {
            return store.state.promotion.promotion
        })
        const minDate = computed(() => {
            return moment(form.dateDebut).add(1, 'day').format('YYYY-MM-DD')
        })
        const addProduct = (params) => {
            if (
                typeof productsList.value.find((item) => {
                    return params.productId === item.productId
                }) === 'undefined'
            ) {
                obj.value.push(params)
                productsList.value = obj.value.map((params) => {
                    return {
                        ...params,
                        newPrice: params.price * (1 + form.taux / 100),
                    }
                })
            }
        }
        watch(
            () => form.taux,
            (count, prevCount) => {
                productsList.value.forEach((params) => {
                    params.newPrice = params.price * (1 + form.taux / 100)
                })
            }
        )
        watch(
            () => form.dateDebut,
            (count, prevCount) => {
                form.dateFin = moment(count).add(1, 'day').format('YYYY-MM-DD')
            }
        )

        const removeProduct = (params) => {
            productsList.value.splice(params, 1)
        }
        const submit = (params) => {
            var obj = {
                name: form.name,
                taux: form.taux,
                dateDebut: moment(form.dateDebut).format('LL'),
                dateFin: moment(form.dateFin).format('LL'),
                productsList: productsList.value,
                promotionId: promotion.value.promotionId,
            }
            store.dispatch('promotion/updatePromotion', obj)
            router.push({ name: 'ListPromotion' })
        }
        const testTaux = (params) => {
            var regex = new RegExp('^[1-9][0-9]?$|^100$')
            if (form.taux.match(regex)) {
                console.log('ok')
            } else {
                return false
            }
        }

        onMounted(async () => {
            await store.dispatch(
                'promotion/getPromotionById',
                route.query.promotionId
            )

            productsList.value = promotion.value.productsList

            form.name = promotion.value.name
            ;(form.dateDebut = moment(promotion.value.dateDebut).format(
                'YYYY-MM-DD'
            )),
                (form.dateFin = moment(promotion.value.dateFin).format(
                    'YYYY-MM-DD'
                )),
                (form.taux = promotion.value.taux)

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
            removeProduct,
            form,
            submit,
            dateDisabled,
            testTaux,
            productsListLength,
            promotion,
            minDate,
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
