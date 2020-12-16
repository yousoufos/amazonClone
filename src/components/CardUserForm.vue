<template>
    <div class="m-auto px-4 py-8 max-w-xl">
        <div class="bg-white shadow-2xl">
            <div class="px-4 py-2 mt-2 bg-white">
                <h2 class="font-bold text-2xl text-gray-800">
                    {{ user.email }}
                </h2>
                <div class="">
                    <form @submit.prevent="onSubmit">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="first_name"
                                            class="block text-sm font-medium text-gray-700"
                                            >First name</label
                                        >
                                        <input
                                            v-model="form.nom"
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            autocomplete="given-name"
                                            required
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="last_name"
                                            class="block text-sm font-medium text-gray-700"
                                            >Last name</label
                                        >
                                        <input
                                            v-model="form.prenom"
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            required
                                            autocomplete="family-name"
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div class="col-span-6">
                                        <label
                                            for="street_address"
                                            class="block text-sm font-medium text-gray-700"
                                            >Adress</label
                                        >
                                        <input
                                            v-model="form.adresse"
                                            type="text"
                                            name="street_address"
                                            id="street_address"
                                            required
                                            autocomplete="street-address"
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div
                                        class="col-span-6 sm:col-span-6 lg:col-span-2"
                                    >
                                        <label
                                            for="tel"
                                            class="block text-sm font-medium text-gray-700"
                                            >Tél</label
                                        >
                                        <input
                                            v-model="form.telephone"
                                            type="text"
                                            name="tel"
                                            required
                                            id="tel"
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                class="px-4 py-3 bg-gray-50 text-right sm:px-6"
                            >
                                <button
                                    type="submit"
                                    class="font-semibold bg-yellow-500 w-20"
                                >
                                    Save
                                </button>
                                <button
                                    @click="cancel"
                                    class="ml-4 font-semibold bg-yellow-500 w-20"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
    props: { user: Object },
    setup(props, { emit }) {
        const store = useStore()
        const form = reactive({
            nom: props.user.nom,
            prenom: props.user.prenom,
            adresse: props.user.adresse,
            telephone: props.user.telephone,
        })
        const onSubmit = ref(() => {
            if (
                (form.nom && form.prenom && form.adresse && form.telephone) !==
                ''
            ) {
                store.dispatch('auth/updateUser', form)
                emit('formCancel', false)
            } else {
                alert('Toys les champs doivents etres rempli')
            }
        })
        const cancel = ref(() => {
            emit('formCancel', false)
        })
        return { cancel, onSubmit, form }
    },
}
</script>

<style></style>
