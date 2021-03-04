<template>
    <div v-if="loading"></div>
    <div v-else class="bg-gray-100">
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
                <HomeCategories @showCategorie="showCategorie"></HomeCategories>
            </div>
            <div class="flex flex-col bg-white">
                <div
                    class="px-2 py-2 font-light text-gray-700 uppercase tracking-normal bg-yellow-300"
                >
                    <p>Best Sellers</p>
                </div>

                <div
                    class="grid grid-cols-2 lg:flex lg:flex-nowrap gap-2 lg:overflow-x-auto lg:overflow-y-hidden scrollbar scrollbar_delayed"
                >
                    <ProductHome
                        class="p-4 flex-none scrollbar-content lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105"
                        v-for="item in width < 700
                            ? bestSeller.slice(0, 4)
                            : bestSeller"
                        :key="item.id"
                        :product="item"
                    ></ProductHome>
                </div>
            </div>
            <div class="hidden lg:flex">
                <div class="w-1/3">
                    <img
                        class="w-72 h-56 object-cover mx-auto"
                        :src="require('../assets/shopping.jpg')"
                        alt=""
                    />
                </div>
                <div class="w-1/3">
                    <img
                        class="w-72 h-56 object-cover mx-auto"
                        :src="require('../assets/famille.jpg')"
                        alt=""
                    />
                </div>
                <div class="w-1/3">
                    <img
                        class="w-72 h-56 object-cover mx-auto"
                        :src="require('../assets/solde.jpg')"
                        alt=""
                    />
                </div>
            </div>
            <div class="flex flex-col bg-white">
                <div
                    class="px-2 py-2 font-light text-gray-700 uppercase tracking-normal bg-yellow-300"
                >
                    <p>Promotion</p>
                </div>
                <div
                    class="grid grid-cols-2 lg:flex lg:flex-nowrap gap-2 lg:overflow-x-auto lg:overflow-y-hidden scrollbar scrollbar_delayed"
                >
                    <ProductHome
                        class="p-4 flex-none scrollbar-content lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105"
                        v-for="item in width < 700
                            ? data.tab.slice(0, 4)
                            : data.tab"
                        :product="item"
                        :key="item.id"
                    ></ProductHome>
                </div>
            </div>
            <!-- <div
                class="flex flex-col lg:mx-auto lg:grid lg:grid-cols-4 lg:gap-2"
            >
                <ProductHome
                    class="m-4 p-4 lg:transition lg:duration-500 lg:ease-in-out lg:transform lg:hover:scale-105"
                    v-for="item in data.tab"
                    :key="item.id"
                    :product="item"
                ></ProductHome>
            </div> -->
        </div>
    </div>
</template>
<script>
import HomeCategories from '../components/HomeCategories'
import spin from '../components/Spin'
import ProductHome from '../components/ProductHome'
import notif from '../components/notif'
import { reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import store from '@/store'
import useBreakpoints from '../compositionFunctions/useBreakpoints'
import useBestSeller from '../compositionFunctions/bestSeller'
export default {
    components: {
        ProductHome,
        notif,
        spin,
        HomeCategories,
    },
    setup() {
        const store = useStore()
        const { width } = useBreakpoints()
        const { bestSeller } = useBestSeller()
        const loading = computed(() => {
            return store.state.navigation.loading
        })

        const test = async () => {}
        const data = reactive({
            tab: computed(() => store.state.product.tab),
        })
        const notification = computed(() => {
            if (store.state.notification.notification) {
                return store.state.notification.notification
            } else {
                return { message: '', type: '', show: false }
            }
        })
        const showCategorie = (params) => {
            console.log(params)
        }

        return {
            data,
            test,
            notification,
            loading,
            width,
            bestSeller,
            showCategorie,
        }
    },
}
</script>
<style scoped>
.gradient {
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
