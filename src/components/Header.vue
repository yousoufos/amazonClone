<template>
    <header>
        <div class="relative bg-gray-900">
            <div class="flex items-center w-full space-x-2">
                <!-- logo -->
                <div class="hidden lg:flex">
                    <router-link to="/">
                        <img src="../assets/logoSvg.svg" alt="" class="" />
                    </router-link>
                </div>
                <!-- logo -->
                <!-- hamburger -->
                <div class="flex justify-center lg:hidden">
                    <button ref="exclude" @click="toggle">
                        <span class="text-4xl text-white material-icons">
                            menu
                        </span>
                    </button>
                </div>
                <!-- hamburger -->
                <!-- search -->
                <div class="relative w-full">
                    <Search></Search>
                </div>
                <!-- search -->
                <!-- mobile cart -->
                <div class="relative flex pr-1 lg:hidden">
                    <div
                        v-if="count != 0"
                        class="absolute inset-y-0 left-0 w-4 h-4 my-1 bg-green-400 rounded-full z-2"
                    >
                        <p class="px-1 text-xs font-medium text-white">
                            {{ count }}
                        </p>
                    </div>
                    <button @click="checkout">
                        <span class="text-4xl text-white material-icons">
                            shopping_cart
                        </span>
                        <!-- <svg
                            class="w-8 h-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                            />
                        </svg> -->
                    </button>
                </div>

                <!-- mobile cart -->
                <!--  menu lg -->
                <div class="hidden lg:flex lg:space-x-12 lg:px-2">
                    <div class="flex items-center">
                        <div class="flex flex-col px-4 text-base">
                            <span
                                class="font-semibold text-white whitespace-nowrap"
                                >{{
                                    user != null ? user.email : 'Hello Guest'
                                }}</span
                            ><router-link :to="user != null ? '' : '/login'">
                                <span class="font-bold text-white">{{
                                    user != null ? '' : 'SignIn'
                                }}</span>
                            </router-link>
                        </div>
                        <div
                            @click="toggleSettings = !toggleSettings"
                            v-if="user != null"
                            class="relative cursor-pointer"
                        >
                            <span class="mt-1 text-white material-icons">
                                {{
                                    toggleSettings === false
                                        ? 'keyboard_arrow_down'
                                        : 'keyboard_arrow_up'
                                }}
                            </span>
                            <transition
                                enter-active-class="transition duration-100 ease-out transform"
                                enter-from-class="scale-95 opacity-0"
                                enter-to-class="scale-100 opacity-100"
                                leave-active-class="transition duration-75 ease-in transform"
                                leave-from-class="scale-100 opacity-100"
                                leave-to-class="scale-95 opacity-0"
                            >
                                <div
                                    v-show="toggleSettings"
                                    class="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu"
                                >
                                    <router-link
                                        :to="{
                                            name: 'userProfile',
                                            query: { userId: user.userId },
                                        }"
                                    >
                                        <div
                                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            My Profile
                                        </div></router-link
                                    >

                                    <router-link
                                        :to="{ name: 'Orders' }"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        >My Orders</router-link
                                    >
                                    <router-link
                                        :to="{ name: 'adminHome' }"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        v-if="isAdmin"
                                        >Admin Section</router-link
                                    >

                                    <router-link
                                        :to="{ name: 'Logout' }"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        >Sign out</router-link
                                    >
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="relative flex">
                        <div
                            v-if="count != 0"
                            class="absolute inset-y-0 left-0 w-4 h-4 my-1 bg-green-400 rounded-full z-2"
                        >
                            <p class="px-1 text-xs font-medium text-white">
                                {{ count }}
                            </p>
                        </div>
                        <button @click="checkout">
                            <span class="text-4xl text-white material-icons">
                                shopping_cart
                            </span>
                        </button>
                    </div>
                </div>
                <!-- menu lg -->
            </div>
            <!-- menu sm -->
            <transition
                enter-active-class="transition duration-100 ease-out transform"
                enter-from-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in transform"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
            >
                <div
                    v-if="menu"
                    class="absolute flex flex-col h-screen font-semibold text-white bg-gray-900 w-60 top-12 lg:hidden"
                    v-closable="{ exclude: exclude, handler: toggle }"
                >
                    <ul class="p-4">
                        <li class="py-2 hover:bg-red-400">
                            <router-link :to="{ name: 'Home' }">
                                <div @click="toggle" class="">Home</div>
                            </router-link>
                        </li>
                        <router-link :to="user != null ? '/logout' : '/login'">
                            <li class="py-2 hover:bg-red-400">
                                {{ user != null ? 'Logout' : 'Sign In' }}
                            </li>
                        </router-link>
                    </ul>
                    <ul class="p-4" v-if="user != null">
                        <router-link
                            :to="{
                                name: user !== null ? 'userProfile' : 'Home',
                                query: {
                                    userId: user !== null ? user.userId : '',
                                },
                            }"
                        >
                            <li class="py-2 hover:bg-red-400">
                                {{ user != null ? user.email : 'Guest' }}
                            </li>
                        </router-link>
                        <router-link to="/admin">
                            <li
                                class="py-2 hover:bg-red-400"
                                v-if="user.role === 'admin'"
                            >
                                Admin Section
                            </li>
                        </router-link>
                        <router-link :to="{ name: 'Orders' }">
                            <li
                                class="py-2 hover:bg-red-400"
                                v-if="user != null"
                            >
                                Your Orders
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
import Search from '../components/Search'
export default {
    components: {
        Search,
    },
    name: 'navBar',
    setup() {
        const router = useRouter()
        const store = useStore()
        const checkout = ref(() => router.push('/checkout'))
        const search = ref('')
        const menu = ref(false)
        const toggleSettings = ref(false)
        const toggle = ref(() => (menu.value = !menu.value))
        const exclude = ref()
        const count = ref(
            computed(() => {
                if (store.state.cart.cart === null) {
                    return 0
                } else {
                    return store.state.cart.cart.items.length
                }
            })
        )
        const isAdmin = ref(
            computed(() => {
                if (store.state.auth.user === null) {
                    return false
                } else {
                    return store.state.auth.user.role === 'admin'
                }
            })
        )
        const user = ref(computed(() => store.state.auth.user))
        return {
            count,
            user,
            search,
            checkout,
            toggle,
            menu,
            isAdmin,
            toggleSettings,
            exclude,
        }
    },
}
</script>

<style></style>
