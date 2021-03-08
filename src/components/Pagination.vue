<template>
    <div class="flex justify-center">
        <div
            @click="next(index + 1)"
            class="border p-1 mx-1 mb-4 border-indigo-600 cursor-pointer"
            :class="{
                'bg-yellow-500': item === start,
            }"
            v-for="(item, index) in numberRecords"
            :key="index"
        >
            {{ item }}
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
    props: {
        data: Array,
        pas: Number,
    },
    setup(props) {
        const dataLength = computed(() => {
            return props.data.length
        })
        const numberRecords = computed(() => {
            return Math.ceil(dataLength.value / props.pas)
        })
        const start = ref(1)
        const tab = computed(() => {
            var indexStart = (start.value - 1) * props.pas

            var tableau = []

            for (var i = indexStart; i < indexStart + props.pas; i++) {
                if (typeof props.data[i] !== 'undefined') {
                    tableau.push(props.data[i])
                }
            }

            return tableau
        })
        const next = (params) => {
            start.value = params
        }
        return {
            start,
            numberRecords,
            next,
            tab,
        }
    },
}
</script>

<style></style>
