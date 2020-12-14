<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
        <div class="max-w-md w-full space-y-8">
            <div>
                <router-link to="/">
                    <img
                        class="mx-auto h-36 w-auto"
                        src="../assets/logo1.png"
                        alt="Workflow"
                    />
                </router-link>
                <h2
                    class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                >
                    Sign in to your account
                </h2>
            </div>
            <form @submit.prevent class="mt-8 space-y-6">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
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
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input
                            v-model="user.password"
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input
                            id="remember_me"
                            name="remember_me"
                            type="checkbox"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                            for="remember_me"
                            class="ml-2 block text-sm text-gray-900"
                        >
                            Remember me
                        </label>
                    </div>

                    <div class="text-sm">
                        <a
                            href="#"
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div class="">
                    <button
                        @click="login"
                        class="w-full bg-yellow-500 font-semibold"
                    >
                        Sign in
                    </button>
                </div>
                <div class="text-center">
                    <button class="bg-gray-200 w-full" @click="register">
                        Or Create an Amazon Account
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive } from 'vue'
import store from '@/store'
import { auth } from '../firebase'
export default {
    setup() {
        const user = reactive({ email: '', password: '' })

        const store = useStore()
        const register = function () {
            store.dispatch('auth/register', user)
        }
        const login = function () {
            store.dispatch('auth/login', user)
        }
        return { user, register, login }
    },
}
</script>

<style></style>
