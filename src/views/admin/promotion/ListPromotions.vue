<template>
    <div class="flex">
        <div><Sidebar :selected="selected" /></div>
        <div class="flex w-full">
            <div class="w-full h-screen overflow-y-auto width568">
                <div v-if="loading"><Spin /></div>
                <div v-else class="flex flex-col w-11/12 py-4 mx-auto">
                    <router-link to="/admin/promotion/newpromotion">
                        <div
                            class="flex justify-center w-48 py-2 mb-4 space-x-2 bg-gray-300 rounded-md cursor-pointer"
                        >
                            <span class="material-icons">
                                add_circle_outline
                            </span>
                            <span>Add Promotion</span>
                        </div>
                    </router-link>
                    <div>
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100">
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Name
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Starting Date
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Ending Date
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Taux %
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Actions
                                </th>
                            </thead>
                            <tbody
                                class="bg-white divide-y divide-gray-200 cursor-pointer"
                            >
                                <tr
                                    v-for="(item, index) in promotions"
                                    :key="index"
                                >
                                    <td
                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        {{ item.name }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        {{ item.dateDebut }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        <span
                                            :class="{
                                                'bg-red-400 p-2 rounded-md text-gray-100': !checkDate(
                                                    item.dateFin
                                                ),
                                                'bg-green-400 p-2 rounded-md ': checkDate(
                                                    item.dateFin
                                                ),
                                            }"
                                        >
                                            {{ item.dateFin }}
                                        </span>
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        {{ item.taux }}
                                    </td>
                                    <td
                                        class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                    >
                                        <span
                                            @click="remove(item)"
                                            class="text-red-500 cursor-pointer material-icons"
                                        >
                                            delete_forever
                                        </span>
                                        <span
                                            @click="edit(item)"
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
</template>

<script>
import Pagination from '../../../components/Pagination'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useCurrency } from '../../../plugins/currencyPlugin'
import moment from 'moment'
export default {
    components: {
        Pagination,
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const currency = useCurrency()
        const toggle = ref(true)
        const selected = ref('Promotion')
        const loading = ref(true)

        const promotions = computed(() => {
            return store.state.promotion.tab
        })

        const remove = (params) => {
            if (confirm('Do you really want to remove this promotion ?')) {
                store.dispatch('promotion/deletePromotion', params)
            } else {
                return
            }
        }
        const edit = (params) => {
            router.push({
                name: 'EditPromotion',
                query: { promotionId: params.promotionId },
            })
        }
        const checkDate = (params) => {
            return moment().isSameOrBefore(params)
        }

        onMounted(async () => {
            //await store.dispatch('promotion/getPromotions')
            loading.value = false
        })

        return {
            toggle,
            selected,
            loading,
            promotions,
            currency,
            remove,
            edit,
            checkDate,
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
