<template>
    <div class="">
        <div
            class="px-2 py-2 mx-auto text-gray-700 font-bold tracking-wider bg-white"
        >
            <p class="">Discover our Categories</p>
        </div>
        <div
            class="px-2 py-4 mx-auto flex flex-nowrap space-x-5 overflow-x-auto bg-white"
        >
            <div
                v-for="item in categories"
                :key="item.id"
                class="flex-none flex flex-col"
            >
                <img
                    class="rounded-full w-20 h-20 lg:w-44 lg:h-44 object-cover lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105"
                    :src="item.picture"
                    alt=""
                />
                <p
                    class="text-center text-xs lg:text-base bg-white -mt-6 lg:-mt-8 py-2 lg:font-bold text-gray-800 z-40"
                >
                    {{ item.name }}
                </p>
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
