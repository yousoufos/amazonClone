<template>
    <navBar></navBar>
    <div class="mt-10 px-4 relative">
        <cardUser
            :user="user"
            @formCancel="cancel"
            v-if="show"
            class="absolute top-0 left-0 right-0 bottom-0"
        ></cardUser>
        <div class="flex">
            <div class="w-2/3">
                <p class="py-3 text-2xl font-bold border-b-2">
                    Finalize your order
                </p>
                <div class="flex flex-col">
                    <div class="py-4 border-b-2">
                        <div class="py-4 flex flex-col">
                            <p class="font-bold text-lg">Coordonées :</p>
                            <div>
                                <span class="font-semibold">Nom :</span>
                                <span>{{ user.nom }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Prénom : </span>
                                <span>{{ user.prenom }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Email : </span>
                                <span>{{ user.email }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Tél : </span>
                                <span>{{ user.telephone }}</span>
                            </div>
                            <div>
                                <span class="font-semibold"
                                    >Adresse de livraison :
                                </span>
                                <span>{{ user.adresse }}</span>
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
                    <div class="py-4 font-bold text-lg">Mode de paiment :</div>
                </div>
            </div>
            <div class="flex flex-col bg-gray-200 w-1/3 h-40 ml-10">
                Oreder Summary
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '../components/Header'
import cardUser from '../components/CardUserForm'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import store from '@/store'
export default {
    setup() {
        const store = useStore()
        const show = ref(false)
        const modifier = ref(async () => {
            show.value = !show.value
        })
        const cancel = ref(() => (show.value = !show.value))
        const user = ref(computed(() => store.state.auth.user))
        return {
            show,
            modifier,
            user,
            cancel,
        }
    },
    components: { navBar: navbar, cardUser },
    async beforeRouteEnter(to, from, next) {
        store.dispatch('auth/getUserDetails', store.state.auth.user.uid)
        next()
    },
}
</script>

<style></style>
