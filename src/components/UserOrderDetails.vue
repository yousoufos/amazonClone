<template>
    <div class="hidden lg:flex lg:flex-col lg:py-4 lg:border-b-2">
        <div class="py-4 flex flex-col">
            <legend class="text-lg font-medium">Coordonées :</legend>
            <div class="px-4 py-2">
                <p>
                    {{ capitalize(user.prenom) + ' ' + capitalize(user.nom) }}
                </p>
                <p>{{ capitalize(user.adresse) }}</p>
                <p>{{ capitalize(user.telephone) }}</p>
                <p>{{ capitalize(user.email) }}</p>
            </div>
        </div>
        <div>
            <button
                @click="modifier"
                class="font-semibold bg-yellow-500 w-20"
                :class="{ 'disabled:opacity-50': show }"
                :disabled="show"
            >
                Modifier
            </button>
        </div>
    </div>
    <div class="flex flex-col lg:hidden">
        <div class="p-4 bg-gray-200 flex w-full justify-between">
            <span class="text-sm text-gray-500 tracking-wider"
                >Adress Details</span
            ><span
                ><button
                    @click="modifier"
                    class="text-sm text-yellow-500 font-semibold tracking-wider"
                >
                    Edit
                </button></span
            >
        </div>
        <div class="p-4 text-sm">
            <p>{{ capitalize(user.prenom) + ' ' + capitalize(user.nom) }}</p>
            <p>{{ capitalize(user.adresse) }}</p>
            <p>{{ capitalize(user.telephone) }}</p>
            <p>{{ capitalize(user.email) }}</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        user: Object,
        show: Boolean,
    },
    emits: ['modifier'],
    setup(props, { emit }) {
        const modifier = ref(() => {
            emit('modifier')
        })
        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
        return { modifier, capitalize }
    },
}
</script>

<style></style>
