<template>
    <div v-if="loading">Loding...</div>
    <div v-else class="flex flex-col lg:mb-10 border-b">
        <div class="flex p-2 border-b">
            <div class="lg:w-1/5">
                <img
                    class="w-20 h-20 lg:w-36 lg:h-36"
                    :src="product.defaultPicture"
                    alt=""
                />
            </div>
            <div class="lg:w-3/5 p-4">
                <p
                    class="font-semibold text-sm"
                    :class="[
                        { 'text-green-500': stock.data.stock > 0 },
                        { 'text-red-500': stock.data.stock === 0 },
                    ]"
                >
                    {{
                        stock.data.stock === 0 ? 'Rupture de stock' : 'En Stock'
                    }}
                </p>
                <p class="text-base lg:text-base lg:font-bold">
                    {{ product.title }}
                </p>

                <p class="font-bold">$ {{ currency.$t(product.price) }}</p>
            </div>
        </div>
        <div class="flex p-2 w-10/12 mx-auto justify-between content-center">
            <div>
                <button
                    @click="remove(product.productId)"
                    class="text-yellow-500 flex"
                >
                    Remove
                    <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </div>
            <div>
                <quantity-component
                    @qteChanged="update"
                    :product="product"
                    :stock="stock.data.stock"
                ></quantity-component>
            </div>
        </div>
        <!-- <div class="hidden lg:flex lg:w-1/5">
            <div class="flex py-8">
                <div class="">
                    <label for="qte" class="px-2 text-black">Quantity</label>
                    <select
                        @change="update(product.productId)"
                        v-model="product.qte"
                        id="qte"
                        name="quantity"
                        class="focus:border-yellow-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent sm:text-sm rounded-md"
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import quantityComponent from '../components/Quantity'
import { useCurrency } from '../plugins/currencyPlugin'
export default {
    props: {
        product: Object,
        total: Number,
    },
    components: { 'quantity-component': quantityComponent },
    setup(props, { emit }) {
        const store = useStore()
        const loading = ref(true)
        const currency = useCurrency()
        const remove = (productId) => {
            store.dispatch('cart/removeFromCart', {
                productId,
                total: props.total,
            })
        }
        const stock = ref(
            computed(() => {
                return store.state.product.product
            })
        )
        const update = ref(async (productId) => {
            await store.dispatch('product/getProductById', productId)
            if (stock.value.data.stock >= props.product.qte) {
                emit('qteUpdated', {
                    qte: props.product.qte,
                    productId: productId,
                })
            } else {
                return
            }
        })
        onMounted(async (params) => {
            await store.dispatch(
                'product/getProductById',
                props.product.productId
            )
            loading.value = false
        })
        return { remove, update, stock, loading, currency }
    },
}
</script>

<style>
input[type='number']::-webkit-inner-spin-button {
    opacity: 1;
}
</style>
