<template>
    <div class="w-1/2 mx-auto">
        <div class="aspect-w-16 aspect-h-9">
            <img src="../assets/informatique.jpg" alt="" />
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import CardTest from '../components/admin/promotion/CardProduct'
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
