<template>
    <div class="py-4 border-b-2">
        <div class="py-4 flex flex-col">
            <legend class="text-lg font-medium">Coordonées :</legend>
            <div class="px-4 py-2">
                <div>
                    <span class="font-semibold">Nom : </span>
                    <span class="text-sm font-medium text-gray-700">{{
                        user.nom
                    }}</span>
                </div>
                <div>
                    <span class="font-semibold">Prénom : </span>
                    <span class="text-sm font-medium text-gray-700">{{
                        user.prenom
                    }}</span>
                </div>
                <div>
                    <span class="font-semibold">Email : </span>
                    <span class="text-sm font-medium text-gray-700">{{
                        user.email
                    }}</span>
                </div>
                <div>
                    <span class="font-semibold">Tél : </span>
                    <span class="text-sm font-medium text-gray-700">{{
                        user.telephone
                    }}</span>
                </div>
                <div>
                    <span class="font-semibold">Adresse de livraison : </span>
                    <span class="text-sm font-medium text-gray-700">{{
                        user.adresse
                    }}</span>
                </div>
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
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        user: Object,
        show: Boolean,
    },
    setup(props, { emit }) {
        const modifier = ref(() => emit('modifier'))
        return { modifier }
    },
}
</script>

<style></style>
