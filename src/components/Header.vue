<template>
    <header>
        <div class="bg-gray-700">
            <div class="flex items-center w-full">
                <!-- logo -->
                <div class="hidden lg:px-6 lg:flex">
                    <router-link to="/">
                        <img
                            src="../assets/logo.png"
                            alt=""
                            class="w-36 h-16"
                        />
                    </router-link>
                </div>
                <!-- logo -->
                <!-- hamburger -->
                <div class="flex px-2 justify-center lg:hidden">
                    <button @click="toggle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="text-white h-8 w-8"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <!-- hamburger -->
                <!-- search -->
                <div
                    class="flex relative w-full py-2 justify-center lg:py-0 lg:w-full"
                >
                    <input
                        class="rounded-lg px-12 w-full"
                        type="text"
                        name=""
                        id=""
                        placeholder="Search for a product"
                    />

                    <div
                        class="absolute pl-3 flex items-center inset-y-0 left-0"
                    >
                        <button class="h-6 w-6">
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
                <!-- search -->
                <!-- mobile cart -->
                <div class="flex relative pr-1 lg:hidden">
                    <div
                        v-if="count != 0"
                        class="absolute inset-y-0 left-0 h-4 w-4 my-1 rounded-full bg-green-400 z-2"
                    >
                        <p class="text-xs px-1 text-white font-medium">
                            {{ count }}
                        </p>
                    </div>
                    <button @click="checkout">
                        <svg
                            class="w-8 h-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                            />
                        </svg>
                    </button>
                </div>
                <!-- mobile cart -->
                <!-- menu lg -->
                <div
                    class="hidden lg:flex lg:max-w-sm lg:py-4 lg:px-2 lg:w-full"
                >
                    <div class="flex flex-col px-4 text-sm">
                        <span class="text-white font-thin">{{
                            user != null ? user.email : 'Hello Guest'
                        }}</span
                        ><router-link :to="user != null ? '/logout' : '/login'">
                            <span class="text-white font-bold">{{
                                user != null ? 'Logout' : 'SignIn'
                            }}</span>
                        </router-link>
                    </div>
                    <div class="flex flex-col px-4 text-sm">
                        <span class="text-white font-thin">See</span
                        ><router-link :to="{ name: 'Orders' }">
                            <span class="text-white font-bold"
                                >Your Orders</span
                            >
                        </router-link>
                    </div>

                    <div class="flex relative">
                        <div
                            v-if="count != 0"
                            class="absolute inset-y-0 left-0 h-4 w-4 my-1 rounded-full bg-green-400 z-2"
                        >
                            <p class="text-xs px-1 text-white font-medium">
                                {{ count }}
                            </p>
                        </div>
                        <button @click="checkout">
                            <svg
                                class="w-8 h-8 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- menu lg -->
            </div>
            <!-- menu sm -->
            <transition
                enter-active-class="animate__animated animate__fadeInDown"
                leave-active-class="animate__animated animate__fadeOutUp"
            >
                <div v-if="menu" class="text-white">
                    <ul class="p-4">
                        <li class="py-2">
                            {{ user != null ? user.email : 'Guest' }}
                        </li>
                        <li v-if="user != null" class="py-2">Orders</li>
                        <router-link :to="user != null ? '/logout' : '/login'">
                            <li class="py-2">
                                {{ user != null ? 'Logout' : 'Sign In' }}
                            </li>
                        </router-link>
                    </ul>
                </div>
            </transition>
            <!-- menu sm -->
        </div>
    </header>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    name: 'navBar',
    setup() {
        const router = useRouter()
        const store = useStore()
        const checkout = ref(() => router.push('/checkout'))
        const search = ref('')
        const menu = ref(false)
        const toggle = ref(() => (menu.value = !menu.value))
        const count = ref(
            computed(() => {
                if (store.state.cart.cart === null) {
                    return 0
                } else {
                    return store.state.cart.cart.items.length
                }
            })
        )
        const user = ref(computed(() => store.state.auth.user))
        return { count, user, search, checkout, toggle, menu }
    },
}
</script>

<style></style>
