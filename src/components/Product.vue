<template>
    <div class="m-1 flex-1 bg-white">
        <div class="px-2 xl:px-2 text-left">
            <p class="font-bold text-xl">{{ title }}</p>
            <p>
                <small>$ </small><strong>{{ price }}</strong>
            </p>
            <p class="py-2 text-sm">{{ description }}</p>
            <div class="flex justify-center">
                <p class="" v-for="n in rating">⭐</p>
            </div>
            <img
                class="xl:w-60 xl:h-60 mx-auto"
                :src="require(`../assets/${picture}`)"
                alt=""
            />
        </div>
        <div class="text-center mb-2">
            <button class="font-semibold bg-yellow-500 w-36">
                Add to cart
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'product',
    props: {
        title: String,
        description: String,
        price: Number,
        picture: String,
        rating: Number,
    },
}
</script>

<style></style>
