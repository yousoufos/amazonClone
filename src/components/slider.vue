<template>
    <div
        class="mx-auto flex flex-nowrap w-4/5 lg:10/12 space-x-2 overflow-x-auto"
    >
        <div
            v-for="item in pictures"
            class="w-52 mx-auto rounded-md text-white flex-none flex items-center justify-center text-2xl font-semibold"
        >
            <img :src="item" alt="" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        pictures: Array,
    },
    setup() {
        const tabImg = ['ps5.jpg', 'iphone12.jpg', 'ps5.jpg', 'ps5.jpg']
        return {
            tabImg,
        }
    },
}
</script>

<style></style>
