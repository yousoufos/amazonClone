<template>
    <div class="">
        <div
            class="px-2 py-2 mx-auto font-light tracking-wider text-gray-700 bg-white"
        >
            <p class="uppercase">Discover our Categories</p>
        </div>
        <div class="bg-white">
            <div
                class="flex px-2 py-4 mx-auto space-x-5 overflow-x-auto flex-nowrap scrollbar scrollbar_delayed"
            >
                <div
                    @click="show(item.id)"
                    v-for="item in categories"
                    :key="item.id"
                    class="flex flex-col flex-none cursor-pointer scrollbar-content"
                >
                    <img
                        class="object-cover w-20 h-20 rounded-full lg:w-44 lg:h-44 lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105"
                        :src="item.picture"
                        alt=""
                    />
                    <p
                        class="z-40 py-2 -mt-6 text-xs tracking-wider text-center text-gray-800 bg-white lg:text-base lg:-mt-8 lg:font-bold"
                    >
                        {{
                            item.name.length >= 15
                                ? item.name.slice(0, 10) + '...'
                                : item.name
                        }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props, { emit }) {
        const store = useStore()
        const loading = ref(true)
        const categories = computed((params) => {
            return store.state.category.categories
        })
        const show = (params) => {
            emit('showCategorie', params)
        }
        onMounted(async (params) => {
            await store.dispatch('category/getCategories')
            loading.value = false
        })
        return { categories, loading, show }
    },
}
</script>
<style></style>
