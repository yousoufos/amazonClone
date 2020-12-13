<template>
    <navBar></navBar>
    <button @click="test">test</button>
    <div class="max-w-screen-xl mx-auto bg-gray-100">
        <div class="hidden xl:flex">
            <img
                class="xl:w-full xl:z-0 xl:-mb-15 gradient"
                src="../assets/banniere.jpg"
                alt=""
            />
        </div>
        <div class="flex flex-col xl:flex xl:flex-row">
            <product
                v-for="item in data.tab"
                :key="item.id"
                :product="item"
            ></product>
        </div>
    </div>
</template>
<script>
import navBar from '../components/Header'
import product from '../components/Product'
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        navBar,
        product,
    },
    setup() {
        const store = useStore()
        const test = ref(() => store.dispatch('product/getProducts'))
        const data = reactive({
            tab: computed(() => store.state.product.tab),
        })
        return { data, test }
    },
}
</script>
<style scoped>
.gradient {
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
