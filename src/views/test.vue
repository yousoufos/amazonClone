<template>
    <div class="flex flex-col">
        <div v-if="loading">Loading...</div>
        <div v-else>
            <ul>
                <li v-for="item in products" :key="item.productId">
                    {{
                        item.productId +
                        '  ' +
                        item.rating +
                        '   ' +
                        item.reviewNumber
                    }}
                </li>
            </ul>
        </div>
        <div class="mt-8 flex flex-col w-1/2">
            <input
                v-model="form.productId"
                type="text"
                name=""
                id=""
                placeholder="productId"
            />
            <input type="text" name="" id="" placeholder="userId" />
            <textarea
                v-model="form.message"
                name=""
                id=""
                placeholder="message"
            />
            <div>
                <span
                    @click="showIndex(index)"
                    v-for="(n, index) in 5"
                    :key="index"
                    class="material-icons text-gray-500 cursor-pointer"
                    :class="{ 'text-yellow-500': index <= clickedIndex }"
                >
                    grade
                </span>
            </div>
            <div>
                <button @click="add" class="bg-gray-500">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore()
        const loading = ref(true)
        const clickedIndex = ref()
        const form = reactive({
            productId: '',
            userId: 'TqKXYPD3EtZouyuTMmT8AIAE9Bn2',
            message: '',
        })
        const products = ref(
            computed(() => {
                return store.state.product.tab
            })
        )
        const showIndex = (index) => {
            clickedIndex.value = index
        }
        const add = async (params) => {
            var review = {
                productId: form.productId,
                userId: form.userId,
                message: form.message,
                rating: Number(clickedIndex.value + 1),
            }
            await store.dispatch('review/addReview', review)
            await store.dispatch('product/updateProductRating', {
                productId: form.productId,
                rating:
                    products.value.find((product) => {
                        return product.productId === form.productId
                    }).rating + Number(clickedIndex.value + 1),
            })
        }
        onMounted(async (params) => {
            await store.dispatch('product/getProducts')
            console.log(products.value)
            loading.value = false
        })
        return {
            products,
            loading,
            showIndex,
            clickedIndex,
            add,
            form,
        }
    },
}
</script>

<style></style>
