<template>
    <div
        class="mx-auto flex flex-nowrap w-4/5 lg:10/12 space-x-2 overflow-x-auto"
    >
        <div
            v-for="item in pictures"
            class="w-52 mx-auto rounded-md text-white flex-none flex items-center justify-center text-2xl font-semibold"
        >
            <img :src="item" alt="" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        pictures: Array,
    },
    setup() {
        const tabImg = ['ps5.jpg', 'iphone12.jpg', 'ps5.jpg', 'ps5.jpg']
        return {
            tabImg,
        }
    },
}
</script>

<style></style>
<template>
    <div
        class="mx-auto flex flex-nowrap w-2/5 lg:10/12 space-x-2 overflow-x-auto"
    >
        <div v-for="item in categories" :key="item.id" class="w-36 h-36">
            <img
                class="rounded-full"
                src="https://demos.creative-tim.com/tailwindcss-starter-project/_next/static/images/team-2-800x800-3e08ef145920c93bbe320add0d2ef58d.jpg"
                alt=""
            />
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
