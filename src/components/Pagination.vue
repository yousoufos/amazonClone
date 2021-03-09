<template>
    <div class="flex justify-center">
        <div
            @click="next(index + 1)"
            class="border p-1 mx-1 mb-4 border-indigo-600 cursor-pointer rounded-full w-8 text-center"
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
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    props: {
        type: String,
        pas: Number,
        data: Object,
    },
    setup(props) {
        const store = useStore()
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
            switch (props.type) {
                case 'products':
                    store.commit('navigation/setProductsPagination', tableau)

                    break
                case 'categories':
                    store.commit('navigation/setCategoriesPagination', tableau)
                    break
                case 'orders':
                    store.commit('navigation/setOrdersPagination', tableau)
                    break
                case 'users':
                    store.commit('navigation/setUsersPagination', tableau)
                    break
            }

            return tableau
        })
        const next = (params) => {
            start.value = params
            if (tab.value.length > 0) {
            }
        }
        onMounted((params) => {
            switch (props.type) {
                case 'products':
                    store.commit('navigation/setProductsPagination', tab.value)
                    break
                case 'categories':
                    store.commit(
                        'navigation/setCategoriesPagination',
                        tab.value
                    )
                    break
                case 'orders':
                    store.commit('navigation/setOrdersPagination', tab.value)
                    break
                case 'users':
                    store.commit('navigation/setUsersPagination', tab.value)
                    break
            }
        })

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
