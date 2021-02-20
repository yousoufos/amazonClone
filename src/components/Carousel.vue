<template>
    <div class="flex flex-col">
        <div class="relative overflow-hidden mx-autow h-80 lg:h-96 w-full">
            <slot></slot>
            <div class="absolute inset-0 flex">
                <div class="flex items-center justify-start w-1/2">
                    <button
                        @click="previous"
                        class="bg-gray-50 flex items-center rounded-full focus:outline-none"
                    >
                        <span
                            class="material-icons text-5xl text-gray-400 hover:text-yellow-500"
                        >
                            navigate_before
                        </span>
                    </button>
                </div>
                <div class="flex items-center justify-end w-1/2">
                    <button
                        @click="next"
                        class="bg-gray-50 flex items-center rounded-full focus:outline-none"
                    >
                        <span
                            class="material-icons text-5xl text-gray-400 hover:text-yellow-500"
                        >
                            navigate_next
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="mx-auto p-2 w-full overflow-y-auto mt-3">
            <div class="flex space-x-1 w-14 h-14">
                <img
                    class="opacity-40 cursor-pointer w-14 h-14"
                    :class="{
                        'opacity-100': index === selectedPicture,
                        'border-red-600': index === selectedPicture,
                        'border-2': index === selectedPicture,
                    }"
                    v-for="(slide, index) in slides"
                    :key="index"
                    :src="slide"
                    alt=""
                    @click="show(index)"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: { slides: Array, selectedPicture: Number },
    setup(props, { emit }) {
        const previous = (params) => {
            emit('previous')
        }
        const next = (params) => {
            emit('next')
        }
        const show = (params) => {
            emit('show', params)
        }
        return {
            previous,
            next,
            show,
        }
    },
}
</script>

<style>
.carousel {
    width: 600px;
    height: 350px;
}
.subCarousel {
    width: 600px;
}
.button {
    top: 50%;
}
</style>
