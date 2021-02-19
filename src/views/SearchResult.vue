<template>
    <div>
        <Navbar></Navbar>
        <transition
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
        >
            <notif
                v-if="notification.show"
                :notification="notification"
                :show="notification.show"
            ></notif>
        </transition>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else>
        <div class="border-b">
            <p class="font-semibold p-2">
                Search Result ({{ products === null ? '0' : products.length }})
            </p>
        </div>
        <div @click="deleting" v-if="from.length > 0">
            <router-link :to="from[from.length - 1]"
                ><span class="material-icons text-4xl">
                    keyboard_backspace
                </span></router-link
            >
        </div>
        <div class="flex flex-col lg:w-1/2 lg:mx-auto">
            <Product
                class="m-4 p-4 lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105"
                v-for="product in products"
                :key="product.objectID"
                :product="product"
            ></Product>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Header'
import Product from '../components/Product'
import notif from '../components/notif'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
    components: {
        Navbar,
        Product,
        notif,
    },

    setup() {
        const route = useRoute()
        const store = useStore()
        const loading = ref(true)
        const products = ref(
            computed(() => {
                return store.state.product.resultSearch
            })
        )
        const notification = ref(
            computed(() => {
                if (store.state.notification.notification) {
                    return store.state.notification.notification
                } else {
                    return { message: '', type: '', show: false }
                }
            })
        )
        const deleting = (params) => {
            store.commit('navigation/removeFrom')
        }
        const from = ref(
            computed((params) => {
                if (typeof store.state.navigation.from === 'undefined') {
                    return []
                } else {
                    return store.state.navigation.from
                }
            })
        )
        onMounted(async (params) => {
            await store.dispatch('product/searchProduct', route.query.search)
            if (store.getters['auth/user']) {
                await store.dispatch(
                    'cart/getUserCart',
                    store.getters['auth/user'].userId
                )
            }
            loading.value = false
        })

        return {
            products,
            loading,
            notification,
            from,
            deleting,
        }
    },
}
</script>

<style></style>
