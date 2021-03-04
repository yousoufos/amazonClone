<template></template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
    setup() {
        const store = useStore()
        const route = useRoute()
        const categorie = computed((params) => {
            return store.state.category.categorie
        })
        const product = computed((params) => {
            return store.state.product.productCategories
        })
        onMounted(async (params) => {
            await store.dispatch('category/getCategorieById', route.query.id)
            await store.dispatch('product/getCategorieProduct', route.query.id)
        })

        return { categorie, product }
    },
}
</script>

<style></style>
