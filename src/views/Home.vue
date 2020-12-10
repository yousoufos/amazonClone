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
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        navBar,
        product,
    },
    setup() {
        const store = useStore()
        const data = reactive({
            tab: computed(() => store.state.product.tab),
        })
        return { data }
    },
}
</script>
<style scoped>
.gradient {
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
