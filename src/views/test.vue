<template>
    <div>
        <Notification :notification="notif"></Notification>
    </div>
</template>

<script>
import { ref, onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import Notification from '../components/notif'

export default {
    components: { Notification },

    setup() {
        const store = useStore()
        const notif = reactive({
            type: 'error',
            message: 'Product Added',
            show: true,
        })

        return {
            notif,
        }
    },
}
</script>

<style></style>
