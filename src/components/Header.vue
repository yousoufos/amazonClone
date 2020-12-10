<template>
    <div class="xl:flex bg-gray-700 xl:w-full">
        <div class="hidden xl:flex">
            <router-link to="/">
                <img src="../assets/logo.png" alt="" class="xl:w-36 xl:h-16" />
            </router-link>
        </div>
        <div class="flex py-3 xl:w-2/3 xl:py-3 xl:px-2">
            <input
                type="text"
                placeholder="Rechercher sur Amazon"
                class="ml-3 w-5/6 h-10 rounded-none xl:h-10 xl:w-full"
            />
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-10 h-10 bg-yellow-500"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
        <div class="xl:flex xl:w-1/3 hidden xl:py-3">
            <div class="flex flex-col xl:w-1/4 xl:ml-2 xl:text-sm">
                <span class="text-white xl:font-thin">Hello Guest</span
                ><span class="text-white xl:font-medium">SignIn</span>
            </div>
            <div class="flex flex-col xl:w-1/4 xl:text-sm">
                <span class="text-white xl:font-thin">Hello Guest</span
                ><span class="text-white xl:font-medium">SignIn</span>
            </div>
            <div class="flex flex-col xl:w-1/4 xl:text-sm">
                <span class="text-white xl:font-thin">Hello Guest</span
                ><span class="text-white xl:font-medium">SignIn</span>
            </div>
            <div class="flex xl:px-2 xl:w-1/4">
                <router-link to="/Checkout">
                    <button>
                        <svg
                            class="xl:w-9 xl:h-9 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                            />
                        </svg>
                    </button>
                </router-link>
                <span class="xl:py-2 xl:ml-2 text-red-600 xl:font-semibold">{{
                    count
                }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed, ref } from 'vue'
export default {
    name: 'navBar',
    setup() {
        const store = useStore()
        const count = ref(computed(() => store.state.product.cart.length))
        return { count }
    },
}
</script>

<style></style>
