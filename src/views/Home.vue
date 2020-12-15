<template>
    <navBar></navBar>
    <div class="max-w-screen-xl mx-auto bg-gray-100">
        <div class="hidden xl:flex">
            <img
                class="xl:w-full xl:z-0 xl:-mb-15 gradient"
                src="../assets/banniere.jpg"
                alt=""
            />
        </div>
        <div class="flex flex-wrap">
            <product
                class="w-96 mx-auto mb-6 transition duration-500 ease-in-out transform hover:scale-110"
                v-for="item in data.tab"
                :key="item.id"
                :product="item"
            ></product>
        </div>
    </div>
    <bas></bas>
</template>
<script>
import navBar from '../components/Header'
import bas from '../components/bas'
import product from '../components/Product'
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import store from '@/store'
export default {
    components: {
        navBar,
        product,
        bas,
    },
    setup() {
        const store = useStore()
        const test = ref(() => store.dispatch('product/getProducts'))
        const data = reactive({
            tab: computed(() => store.state.product.tab),
        })
        return { data, test }
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch('product/getProducts')
        if (store.getters['auth/user']) {
            store.dispatch('cart/getUserCart', store.getters['auth/user'].uid)
        }
        next()
    },
}
</script>
<style scoped>
.gradient {
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
