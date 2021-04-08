<template>
    <div class="flex flex-col w-1/3 ml-10 bg-gray-200 rounded-md">
        <div class="p-4 border-b border-gray-400">
            <p class="text-lg font-medium">Your Order</p>
        </div>
        <div v-for="item in cart.items" :key="item.productId">
            <div class="flex">
                <div class="p-4">
                    <img class="w-16 h-16" :src="item.defaultPicture" alt="" />
                </div>
                <div class="py-4">
                    <p class="text-sm">{{ item.title }}</p>
                    <p class="text-sm font-medium text-yellow-500">
                        {{ currency.$t(item.price) }}
                    </p>
                    <p class="text-sm font-medium">Qte : {{ item.qte }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col py-2 border-t border-b border-gray-400">
            <div class="flex justify-between text-sm font-medium text-black">
                <span class="px-4">Sub Total : </span>
                <span class="px-4">{{ currency.$t(cart.total) }}</span>
            </div>
            <div class="flex justify-between text-sm font-medium text-black">
                <span class="px-4">Delivery Price : </span>
                <span class="px-4">{{ currency.$t(5) }}</span>
            </div>
        </div>
        <div class="flex justify-between p-4">
            <span class="text-lg font-semibold">Total : </span>
            <span class="text-lg font-bold text-yellow-500">{{
                currency.$t(Number(cart.total) + 5)
            }}</span>
        </div>
        <div class="p-6">
            <button @click="valider" class="w-full font-semibold bg-yellow-500">
                Order Now
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useCurrency } from '../plugins/currencyPlugin'
export default {
    props: { cart: Object },
    setup(props, { emit }) {
        const currency = useCurrency()
        const valider = ref(() => emit('valider'))
        return { valider, currency }
    },
}
</script>

<style></style>
