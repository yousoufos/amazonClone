<template>
    <div v-if="loading">
        <spin></spin>
    </div>
    <div v-else>
        <navBar></navBar>
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
        <div class="mx-auto bg-gray-100">
            <div class="hidden xl:flex">
                <img
                    class="xl:w-full xl:z-0 xl:-mb-15 gradient"
                    src="../assets/banniere.jpg"
                    alt=""
                />
            </div>
            <div
                class="flex flex-col lg:w-11/12 lg:mx-auto lg:grid lg:grid-cols-4 lg:gap-2"
            >
                <product
                    class="m-4 p-4 lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-110"
                    v-for="item in data.tab"
                    :key="item.id"
                    :product="item"
                ></product>
            </div>
        </div>
        <bas></bas>
    </div>
</template>
<script>
import navBar from '../components/Header'
import spin from '../components/Spin'
import bas from '../components/bas'
import product from '../components/Product'
import notif from '../components/notif'
import { reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import store from '@/store'
export default {
    components: {
        navBar,
        product,
        bas,
        notif,
        spin,
    },
    setup() {
        const store = useStore()
        const loading = ref(true)
        onMounted(async () => {
            console.log('loading')
            await store.dispatch('product/getProducts')

            if (store.getters['auth/user']) {
                await store.dispatch(
                    'cart/getUserCart',
                    store.getters['auth/user'].uid
                )
            }

            loading.value = false
        })
        const test = async () => {}
        console.log('setup')
        const data = reactive({
            tab: computed(() => store.state.product.tab),
        })
        const notification = ref(
            computed(() => {
                if (store.state.cart.notification) {
                    return store.state.cart.notification
                } else {
                    return { message: '', type: '', show: false }
                }
            })
        )

        return {
            data,
            test,
            notification,
            loading,
        }
    },
    /* async beforeRouteEnter(to, from, next) {
        await store.dispatch('product/getProducts')
        if (store.getters['auth/user']) {
            await store.dispatch(
                'cart/getUserCart',
                store.getters['auth/user'].uid
            )
        }
        next()
    }, */
}
</script>
<style scoped>
.gradient {
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
