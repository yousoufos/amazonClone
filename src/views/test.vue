<template>
    <div>
        <div
            class="px-2 py-4 mx-auto flex flex-nowrap lg:w-4/5 space-x-5 overflow-x-auto"
        >
            <div
                v-for="(item, index) in 15"
                :key="index"
                class="flex-none w-56 h-56 bg-red-500"
            ></div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const loading = ref(true)
        const categories = computed((params) => {
            return store.state.category.categories
        })
        onMounted(async (params) => {
            await store.dispatch('category/getCategories')
            loading.value = false
        })
        return { categories, loading }
    },
}
</script>
<style></style>
