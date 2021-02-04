<template>
    <div class="flex relative w-full justify-center lg:py-0">
        <div class="flex items-center w-full">
            <input
                class="rounded-lg px-12 w-full"
                type="text"
                name=""
                id=""
                placeholder="Search for a product"
                v-model="search"
                @input="find"
                @keyup.enter="showDetails"
            />
            <span
                v-if="toggleSearch"
                @click="close"
                class="material-icons -ml-8 text-gray-500 cursor-pointer"
            >
                clear
            </span>
        </div>

        <div class="absolute pl-3 flex items-center inset-y-0 left-0">
            <button @click="find" class="h-6 w-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="text-gray-500"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </div>
    <div
        v-if="toggleSearch"
        class="absolute origin-bottom-left left-0 z-30 bg-white shadow-md font-semibold text-sm w-full rounded-b-md py-2 px-4"
    >
        <ul>
            <li
                class="cursor-pointer py-2"
                v-for="item in product"
                :key="item.objectID"
                @click="showDetails(item)"
            >
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default {
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const toggleSearch = ref(false)
        const search = ref('')
        const close = (params) => {
            toggleSearch.value = !toggleSearch.value
            search.value = ''
        }
        const find = (params) => {
            if (search.value === '' && route.name !== 'searchResult') {
                store.dispatch('product/resetSearch')
                toggleSearch.value = false
            } else {
                if (search.value.length > 2 && route.name !== 'searchResult') {
                    store.dispatch('product/searchProduct', search.value)
                    toggleSearch.value = true
                }
            }
        }
        const product = ref(
            computed(() => {
                return store.state.product.resultSearch
            })
        )
        const showDetails = (item) => {
            router.push({
                name: 'searchResult',
                query: { search: search.value },
            })
            toggleSearch.value = false
        }

        return {
            toggleSearch,
            search,
            find,
            product,
            close,
            showDetails,
        }
    },
}
</script>

<style></style>
