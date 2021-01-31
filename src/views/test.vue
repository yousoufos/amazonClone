<template>
    <InputPassword
        placeholder="New Password"
        type="password"
        v-model="password"
    ></InputPassword>
    <div>{{ password }}</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import InputPassword from '../components/InputPassword'
export default {
    components: { InputPassword },

    setup() {
        const password = ref('')
        const store = useStore()
        const change = (e) => {
            password.value = e
        }

        return {
            change,
            password,
        }
    },
}
</script>

<style></style>
