<template>
    <div>
        <input v-model="valeur" type="text" name="" id="" />
        <h2>{{ i18n.$t(valeur) }}</h2>
    </div>
</template>

<script>
import { useI18n } from '../plugins/i18nPlugin'
import { ref } from 'vue'

export default {
    setup() {
        const i18n = useI18n()
        const valeur = ref('')

        return { i18n, valeur }
    },
}
</script>
