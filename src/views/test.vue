<template>
    <div>
        <ul>
            <li v-for="product in tab" :key="product.productId">
                {{ product.title }}
            </li>
        </ul>
        <div class="flex">
            <div
                @click="next(index + 1)"
                class="border p-2 border-indigo-600 cursor-pointer"
                :class="{ 'bg-yellow-500': item === start }"
                v-for="(item, index) in numberRecords"
                :key="index"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
import Chart from '../components/charts/Chart'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'
export default {
    components: {
        Chart,
    },
    setup() {
        const store = useStore()
        const products = computed(() => {
            return store.state.product.tab
        })
        const pas = ref(4)
        const productsLength = computed(() => {
            return products.value.length
        })
        const numberRecords = computed(() => {
            return Math.ceil(productsLength.value / pas.value)
        })
        var start = ref(1)
        const loading = ref(true)
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
        onMounted(async (params) => {
            loading.value = false
        })
        return { loading, products, numberRecords, tab, next, start }
    },
}
</script>

<style></style>
