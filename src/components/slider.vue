<template>
    <div>
        <Carousel
            @next="next"
            @previous="previous"
            @show="showPicture"
            :slides="pictures"
            :selectedPicture="selectedPicture"
        >
            <CarouselSlide
                v-for="(slide, index) in pictures"
                :key="index"
                :index="index"
                :visibleSlide="visibleSlide"
                :direction="direction"
                @picture="activePicture"
                ><img class="h-80 lg:h-96 mx-auto" :src="slide"
            /></CarouselSlide>
        </Carousel>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import Carousel from '../components/Carousel'
import CarouselSlide from '../components/CarouselSlide'
export default {
    props: { pictures: Array },
    components: { Carousel, CarouselSlide },
    setup(props) {
        const slides = ref([
            'https://picsum.photos/id/237/600/350',
            'https://picsum.photos/id/238/600/350',
            'https://picsum.photos/id/239/600/350',
            'https://picsum.photos/id/230/600/350',
            'https://picsum.photos/id/231/600/350',
            'https://picsum.photos/id/233/600/350',
            'https://picsum.photos/id/234/600/350',
            'https://picsum.photos/id/236/600/350',
        ])
        const direction = ref('left')
        const visibleSlide = ref(0)
        const selectedPicture = ref(0)
        const slidesLen = computed(() => {
            return props.pictures.length
        })
        const previous = (params) => {
            if (visibleSlide.value <= 0) {
                visibleSlide.value = slidesLen.value - 1
            } else {
                visibleSlide.value--
            }
            direction.value = 'right'
        }
        const next = (params) => {
            if (visibleSlide.value >= slidesLen.value - 1) {
                visibleSlide.value = 0
            } else {
                visibleSlide.value++
            }
            direction.value = 'left'
        }
        const activePicture = (params) => {
            selectedPicture.value = params
        }
        const showPicture = (params) => {
            visibleSlide.value = params
        }
        return {
            slides,
            visibleSlide,
            previous,
            next,
            direction,
            activePicture,
            selectedPicture,
            showPicture,
        }
    },
}
</script>

<style></style>
