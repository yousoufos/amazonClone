<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else>
        <div class="border-b">
            <p class="font-semibold p-2">
                Search Result ({{ products === null ? '0' : products.length }})
            </p>
        </div>
        <div class="flex flex-col">
            <Product
                class="m-4 p-4 lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105"
                v-for="product in products"
                :key="product.objectID"
                :product="product"
            ></Product>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Header'
import Product from '../components/Product'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
    components: {
        Navbar,
        Product,
    },

    setup() {
        const route = useRoute()
        const store = useStore()
        const loading = ref(true)
        const products = ref(
            computed(() => {
                return store.state.product.resultSearch
            })
        )
        onMounted(async (params) => {
            await store.dispatch('product/searchProduct', route.query.search)
            loading.value = false
        })
        return {
            products,
            loading,
        }
    },
}
</script>

<style></style>
