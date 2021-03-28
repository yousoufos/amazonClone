<template>
    <div
        class="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8"
    >
        <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
        >
            <Notif
                v-if="notification.show"
                :notification="notification"
                :show="notification.show"
            />
        </transition>
        <div class="w-full max-w-md space-y-8">
            <div>
                <router-link to="/">
                    <img
                        class="w-auto mx-auto h-36"
                        src="../assets/logoSvg.svg"
                        alt="Workflow"
                    />
                </router-link>
                <h2
                    class="mt-6 text-3xl font-extrabold text-center text-gray-900"
                >
                    Sign in to your account
                </h2>
            </div>
            <form @submit.prevent class="mt-8 space-y-6">
                <input type="hidden" name="remember" value="true" />
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only"
                            >Email address</label
                        >
                        <input
                            v-model="user.email"
                            id="email-address"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <InputPassword
                            v-model="user.password"
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required="true"
                            class="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        ></InputPassword>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div @click="resetPassword" class="text-sm cursor-pointer">
                        <p
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot your password?
                        </p>
                    </div>
                </div>

                <div class="">
                    <button
                        @click="login"
                        class="w-full font-semibold bg-yellow-500"
                    >
                        Sign in
                    </button>
                </div>
                <div class="text-center">
                    <button class="w-full bg-gray-200" @click="register">
                        Or Create an Amazon Account
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, ref, computed } from 'vue'
import InputPassword from '../components/InputPassword'

export default {
    components: {
        InputPassword,
    },
    setup() {
        const user = reactive({ email: '', password: '' })

        const store = useStore()
        const register = function () {
            store.dispatch('auth/register', user)
        }
        const login = function () {
            store.dispatch('auth/login', user)
        }
        const notification = ref(
            computed(() => {
                if (store.state.notification.notification) {
                    return store.state.notification.notification
                } else {
                    return { message: '', type: '', show: false }
                }
            })
        )
        const resetPassword = (params) => {
            if (user.email != '') {
                store.dispatch('auth/resetPassword', user.email)
            } else {
                alert('No email entred')
            }
        }
        return { user, register, login, notification, resetPassword }
    },
}
</script>

<style></style>
