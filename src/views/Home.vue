<template>
    <navBar></navBar>
    <div class="mx-auto bg-gray-100">
        <div class="hidden xl:flex">
            <img
                class="xl:w-full xl:z-0 xl:-mb-15 gradient"
                src="../assets/banniere.jpg"
                alt=""
            />
        </div>
        <div class="w-11/12 mx-auto grid grid-cols-4 gap-2">
            <product
                class="mb-6 transition duration-500 ease-in-out transform hover:scale-110"
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
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('product/getProducts')
        if (store.getters['auth/user']) {
            await store.dispatch(
                'cart/getUserCart',
                store.getters['auth/user'].uid
            )
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
