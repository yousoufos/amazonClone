<template>
    <div class="flex items-center">
        <div>
            <button :disabled="product.qte <= 1" @click="moins" class="flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-6 h-6 text-yellow-500"
                    :class="{ 'disabled:opacity-50': product.qte <= 1 }"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
        <div>
            <input
                disabled
                v-model="product.qte"
                class="h-6 text-center rounded-md"
                size="2"
                type="text"
            />
        </div>
        <div>
            <button :disabled="product.qte >= 10" @click="plus" class="flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-6 h-6 text-yellow-500"
                    :class="{ 'disabled:opacity-50': product.qte >= 10 }"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: { product: Object },
    data() {
        return {}
    },
    methods: {
        plus() {
            if (this.product.qte <= 10) {
                this.product.qte++
                this.$emit('qteChanged', this.product.productId)
            }
        },
        moins() {
            if (this.product.qte >= 1) {
                this.product.qte--
                this.$emit('qteChanged', this.product.productId)
            }
        },
    },
}
</script>

<style></style>
