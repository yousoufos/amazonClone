<template>
    <div class="flex mb-10 border-b-2">
        <div class="w-1/5">
            <img
                class="w-36 h-36"
                :src="require(`../assets/${product.picture}`)"
                alt=""
            />
        </div>
        <div class="w-3/5">
            <p class="font-bold">{{ product.title }}</p>
            <p>{{ product.description }}</p>
            <p class="font-bold">$ {{ product.price }}</p>
            <div class="flex">
                <p class="mb-2" v-for="n in product.rating">⭐</p>
            </div>
            <button @click="remove(product.productId)" class="btnOrange">
                Remove from cart
            </button>
        </div>
        <div class="w-1/5">
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
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
    props: {
        product: Object,
        total: Number,
    },
    setup(props, { emit }) {
        const store = useStore()
        const test = () => console.log()
        const remove = (productId) => {
            store.dispatch('cart/removeFromCart', {
                productId,
                total: props.total,
            })
        }
        const update = ref((productId) => {
            emit('qteUpdated', { qte: props.product.qte, productId: productId })
        })
        return { remove, update }
    },
}
</script>

<style>
input[type='number']::-webkit-inner-spin-button {
    opacity: 1;
}
</style>
