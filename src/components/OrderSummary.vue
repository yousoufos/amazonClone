<template>
    <div class="flex flex-col bg-gray-200 w-1/3 ml-10">
        <div class="p-4 border-b border-gray-400">
            <p class="text-lg font-medium">Order</p>
        </div>
        <div v-for="item in cart.items" :key="item.productId">
            <div class="flex">
                <div class="p-4">
                    <img class="w-16 h-16" :src="item.defaultPicture" alt="" />
                </div>
                <div class="py-4">
                    <p class="text-sm">{{ item.title }}</p>
                    <p class="text-sm text-yellow-500 font-medium">
                        $ {{ item.price }}
                    </p>
                    <p class="text-sm font-medium">Qte : {{ item.qte }}</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col border-t border-b border-gray-400 py-2">
            <div class="flex justify-between text-sm font-medium text-black">
                <span class="px-4">Sous-total : </span>
                <span class="px-4">{{ cart.total }}</span>
            </div>
            <div class="flex justify-between text-sm font-medium text-black">
                <span class="px-4">Frais de livraison : </span>
                <span class="px-4">5</span>
            </div>
        </div>
        <div class="flex justify-between p-4">
            <span class="font-semibold text-lg">Total : </span>
            <span class="font-bold text-lg text-yellow-500">{{
                Number(cart.total) + 5
            }}</span>
        </div>
        <div class="p-6">
            <button @click="valider" class="font-semibold bg-yellow-500 w-full">
                Order Now
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: { cart: Object },
    setup(props, { emit }) {
        const valider = ref(() => emit('valider'))
        return { valider }
    },
}
</script>

<style></style>
