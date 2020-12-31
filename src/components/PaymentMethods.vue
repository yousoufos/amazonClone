<template>
    <div class="lg:py-4">
        <fieldset>
            <div>
                <legend
                    class="p-4 w-full text-sm text-gray-500 tracking-wider lg:bg-white lg:text-lg lg:font-medium bg-gray-200"
                >
                    Choose your payment method :
                </legend>
            </div>
            <div class="mt-4 space-y-4">
                <div class="flex items-center">
                    <input
                        @change="paymentMethod"
                        v-model="p"
                        id="livraison"
                        value="Payment on delivery"
                        name="payment"
                        type="radio"
                        class="focus:ring-white h-4 w-4 text-yellow-500 border-gray-300"
                    />
                    <label
                        for="livraison"
                        class="ml-3 block text-sm font-medium text-black"
                    >
                        Payment on delivery
                    </label>
                </div>
                <div class="flex items-center">
                    <input
                        @change="paymentMethod"
                        v-model="p"
                        id="carte"
                        value="Payment with credit card"
                        name="payment"
                        type="radio"
                        class="focus:ring-white h-4 w-4 text-yellow-500 border-gray-300"
                    />
                    <label
                        for="carte"
                        class="ml-3 block text-sm font-medium text-black"
                    >
                        Payment with credit card
                    </label>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: {},
    setup(props, { emit }) {
        const p = ref()
        const paymentMethod = ref(() => {
            emit('methodSelected', p.value)
        })
        return { paymentMethod, p }
    },
}
</script>

<style></style>
