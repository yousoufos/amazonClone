<template>
    <div class="hidden lg:flex lg:flex-col lg:py-4 lg:border-b-2">
        <div class="flex flex-col py-4">
            <legend class="text-lg font-medium">Details :</legend>
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
                class="w-20 font-semibold bg-yellow-500"
                :class="{ 'disabled:opacity-50': show }"
                :disabled="show"
            >
                Edit
            </button>
        </div>
    </div>
    <div class="flex flex-col lg:hidden">
        <div class="flex justify-between w-full p-4 bg-gray-200">
            <span class="text-sm tracking-wider text-gray-500"> Details</span
            ><span
                ><button
                    @click="modifier"
                    class="text-sm font-semibold tracking-wider text-yellow-500"
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
