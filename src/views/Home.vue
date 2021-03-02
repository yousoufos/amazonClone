<template>
    <div v-if="loading"></div>
    <div v-else>
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
        <div class="flex flex-col mx-auto lg:w-11/12 space-y-4">
            <div class="-mb-64 hidden lg:flex">
                <img
                    class="w-full"
                    src="https://images-eu.ssl-images-amazon.com/images/G/08/kindle/journeys/YzkyZTQzZGQt/YzkyZTQzZGQt-OTVjNzIxZDIt-w1500._CB659208910_.jpg"
                    alt=""
                />
            </div>
            <div class="">
                <HomeCategories></HomeCategories>
            </div>
            <div
                class="flex flex-col lg:mx-auto lg:grid lg:grid-cols-4 lg:gap-2"
            >
                <product
                    class="m-4 p-4 lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105"
                    v-for="item in data.tab"
                    :key="item.id"
                    :product="item"
                ></product>
            </div>
        </div>
    </div>
</template>
<script>
import HomeCategories from '../components/HomeCategories'
import spin from '../components/Spin'
import product from '../components/Product'
import notif from '../components/notif'
import { reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import store from '@/store'
export default {
    components: {
        product,
        notif,
        spin,
        HomeCategories,
    },
    setup() {
        const store = useStore()
        const loading = ref(
            computed(() => {
                return store.state.navigation.loading
            })
        )

        const test = async () => {}
        const data = reactive({
            tab: computed(() => store.state.product.tab),
        })
        const notification = ref(
            computed(() => {
                if (store.state.notification.notification) {
                    return store.state.notification.notification
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
}
</script>
<style scoped>
.gradient {
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
