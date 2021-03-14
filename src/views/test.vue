<template>
    <div class="relative h-screen">
        <CardTest class=""></CardTest>
        <div class=""></div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import CardTest from '../components/CardTest'
import { useStore } from 'vuex'
export default {
    components: {
        CardTest,
    },
    setup() {
        const store = useStore()

        return {}
    },
}
</script>
<style></style>
