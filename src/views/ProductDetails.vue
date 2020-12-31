<template>
    <div>
        <Header></Header>
    </div>
    <div v-if="loading">
        <spin></spin>
    </div>

    <div v-else class="bg-gray-200">
        <div class="lg:flex lg:py-10 lg:w-10/12 lg:mx-auto lg:rounded-lg">
            <div class="w-2/3 mx-auto py-2 lg:w-3/5 lg:m-0 lg:p-0">
                <img
                    :src="require(`../assets/${product.data.picture}`)"
                    alt=""
                />
            </div>
            <div class="bg-white p-4 lg:w-full lg:py-14">
                <p class="font-light text-sm lg:text-3xl">
                    {{ product.data.title }}
                </p>
                <p class="font-bold py-2 text-lg lg:text-4xl">
                    {{ product.data.price }} TND
                </p>
                <div>
                    <div class="flex text-gray-400">
                        <svg
                            v-for="item in 5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="h-4 w-4"
                            :class="{
                                'text-yellow-500': item <= product.data.rating,
                            }"
                        >
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                    </div>
                    <div>
                        <p class="px-4 text-xs">24 Notes</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 text-gray-600 text-sm lg:hidden">
            DETAILS DU PRODUIT
        </div>
        <div class="bg-white text-sm lg:w-10/12 lg:mx-auto">
            <div class="lg:flex hidden">
                <p class="text-gray-500 px-4 border-b w-full text-base">
                    DETAILS DU PRODUIT
                </p>
            </div>
            <p class="p-2 text-justify">
                {{ product.data.description }}
            </p>
        </div>
        <div class="p-2 text-gray-600 text-sm lg:hidden">
            AVIS DES UTILISATEURS
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import spin from '../components/Spin'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'

export default {
    components: { Header, spin },
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const loading = ref(true)
        console.log(route.query.productId)

        onMounted(async () => {
            await store.dispatch(
                'product/getProductById',
                route.query.productId
            )
            loading.value = false
        })

        const product = ref(
            computed(() => {
                if (store.state.product.product === null) {
                    return {
                        description: '',
                        price: '',
                        title: '',
                        rating: '',
                        picture: '',
                    }
                } else {
                    return store.state.product.product
                }
            })
        )
        console.log(product.value)

        return { product, loading }
    },
}
</script>

<style></style>
