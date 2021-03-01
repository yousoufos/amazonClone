<template>
    <div>
        <div v-if="loading">Loading....</div>
        <div class="flex space-x-4 mt-10">
            <div class="" v-for="cat in categories" :key="cat.id">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/amzonclone-7cf14.appspot.com/o/categories%2FD9eHDBy1RHWQcq1QKpGc%2FsmartphonesCategories.jpeg?alt=media&token=9b8a6312-892e-4fe2-b4b5-9e51283e407f"
                    alt="..."
                    class="shadow-lg rounded-full align-middle border-none"
                />
            </div>
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
