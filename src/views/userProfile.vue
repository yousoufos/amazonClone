<template>
    <div>
        <div>
            <Header></Header>
            <transition
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutLeft"
            >
                <notif
                    v-if="notification.show"
                    :notification="notification"
                    :show="notification.show"
                ></notif>
            </transition>
        </div>
        <div class="p-4 space-y-2 lg:w-1/2 lg:mx-auto">
            <div class="bg-gray-100 flex items-center">
                <span class="material-icons text-gray-700">
                    account_circle
                </span>
                <p class="text-gray-700 font-semibold py-2">Your profile</p>
            </div>
            <div class="bg-gray-100 p-2">
                <div class="space-y-2 text-sm">
                    <div>
                        <p v-if="toggleEdit">
                            {{
                                capitalize(user.prenom) +
                                ', ' +
                                capitalize(user.nom)
                            }}
                        </p>
                        <div v-else class="space-y-2 flex flex-col">
                            <input
                                class="rounded-md"
                                v-model="user.prenom"
                                type="text"
                            />
                            <input
                                class="rounded-md"
                                v-model="user.nom"
                                type="text"
                            />
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <p v-if="toggleEdit">{{ capitalize(user.adresse) }}</p>
                        <input
                            class="rounded-md"
                            v-else
                            v-model="user.adresse"
                            type="text"
                        />
                    </div>
                    <div class="flex flex-col">
                        <p v-if="toggleEdit">
                            {{ capitalize(user.telephone) }}
                        </p>
                        <input
                            class="rounded-md"
                            v-else
                            v-model="user.telephone"
                            type="text"
                        />
                    </div>
                    <div class="flex flex-col">
                        <p v-if="toggleEdit">{{ capitalize(user.email) }}</p>
                        <input
                            class="rounded-md"
                            v-else
                            v-model="user.email"
                            type="text"
                        />
                    </div>
                    <div>
                        <div v-if="toggleEdit">
                            <button
                                @click="editProfile"
                                class="bg-yellow-500 w-full rounded-md"
                            >
                                Edit
                            </button>
                        </div>
                        <div v-else class="flex space-x-4">
                            <button
                                @click="saveProfile"
                                class="bg-yellow-500 w-full rounded-md"
                            >
                                Save
                            </button>
                            <button
                                @click="cancel"
                                class="bg-yellow-500 w-full rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-100 flex items-center space-x-1">
                <span class="material-icons text-gray-700"> vpn_key </span>
                <p class="text-gray-700 font-semibold py-2">Reset Password</p>
            </div>
            <div class="bg-gray-100 p-2 text-sm flex flex-col space-y-4">
                <div class="flex flex-col">
                    <input
                        class="rounded-md"
                        type="password"
                        placeholder="Current password"
                        v-model="login.currentPwd"
                        @keyup="checkUpdateButton"
                    />
                </div>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <!-- <InputPassword
                            type="password"
                            placeholder="New password"
                            @changed="checkUpdateButton"
                        ></InputPassword> -->
                        <input
                            class="rounded-md"
                            type="password"
                            placeholder="New password"
                            v-model="login.newPwd"
                            @keyup="checkUpdateButton"
                        />
                        <div
                            v-if="login.newPwd !== ''"
                            class="rounded-md p-1 mt-1"
                            :class="[
                                {
                                    'bg-red-300':
                                        passwordStrength(login.newPwd).value ===
                                        'Weak',
                                },
                                {
                                    'bg-yellow-300':
                                        passwordStrength(login.newPwd).value ===
                                        'Medium',
                                },
                                {
                                    'bg-green-300':
                                        passwordStrength(login.newPwd).value ===
                                        'Strong',
                                },
                            ]"
                        >
                            <p>
                                Password Strength:
                                <strong>{{
                                    passwordStrength(login.newPwd).value
                                }}</strong>
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <input
                            class="rounded-md"
                            type="password"
                            placeholder="Confirm passowrd"
                            v-model="login.verifyPwd"
                            @keyup="checkUpdateButton"
                        />
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button
                        :disabled="toggleUpdate"
                        @click="updateLogin"
                        class="bg-yellow-500 w-full rounded-md"
                        :class="{ 'disabled:opacity-50': toggleUpdate }"
                    >
                        Update
                    </button>
                    <button
                        @click="cancelLogin"
                        class="bg-yellow-500 w-full rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Notif from '../components/notif.vue'
import InputPassword from '../components/InputPassword'
import { ref, computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import passwordStrength from 'check-password-strength'
export default {
    components: {
        Header,
        Notif,
        InputPassword,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const toggleEdit = ref(true)
        const login = reactive({
            currentPwd: '',
            newPwd: '',
            verifyPwd: '',
        })
        const toggleUpdate = ref(true)
        const checkUpdateButton = (params) => {
            if ((login.newPwd && login.verifyPwd && login.currentPwd) !== '') {
                if (login.newPwd === login.verifyPwd) {
                    if (passwordStrength(login.newPwd).value !== 'Weak') {
                        toggleUpdate.value = false
                    } else {
                        toggleUpdate.value = true
                    }
                } else {
                    toggleUpdate.value = true
                }
            } else {
                toggleUpdate.value = true
            }
        }
        const notification = ref(
            computed(() => {
                if (store.state.notification.notification) {
                    return store.state.notification.notification
                } else {
                    return { message: '', type: '', show: false }
                }
            })
        )
        const resultPwdVerification = computed(() => store.state.auth.resultPwd)
        const cancelLogin = (params) => {
            login.currentPwd = ''
            login.newPwd = ''
            login.verifyPwd = ''
            toggleUpdate.value = false
        }

        const updateLogin = async (params) => {
            if ((login.newPwd && login.verifyPwd && login.currentPwd) !== '') {
                if (login.newPwd === login.verifyPwd) {
                    if (passwordStrength(login.newPwd).value !== 'Weak') {
                        await store.dispatch('auth/reLogin', {
                            email: user.value.email,
                            password: login.currentPwd,
                        })

                        if (resultPwdVerification.value) {
                            console.log('Mot de passe correct')
                            await store.dispatch(
                                'auth/updatePassword',
                                login.newPwd
                            )
                            login.currentPwd = ''
                            login.newPwd = ''
                            login.verifyPwd = ''
                        } else {
                            console.log('Mot de passe incorrect')
                        }
                    } else {
                        alert('Password very weak')
                    }
                } else {
                    alert('password not match')
                }
            } else {
                alert('all field must be passed')
            }
        }
        let form = {}

        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
        const user = ref(
            computed(() => {
                return store.state.auth.user
            })
        )
        const cancel = (params) => {
            user.value.nom = form.nom
            user.value.prenom = form.prenom
            user.value.adresse = form.adresse
            user.value.telephone = form.telephone
            user.value.email = form.email
            toggleEdit.value = true
        }
        const editProfile = (params) => {
            form = { ...user.value }
            toggleEdit.value = false
        }
        const saveProfile = (params) => {
            if (
                (user.value.nom &&
                    user.value.prenom &&
                    user.value.adresse &&
                    user.value.telephone &&
                    user.value.email) !== ''
            ) {
                store.dispatch('auth/updateUser', user.value)
                toggleEdit.value = true
            } else {
                alert('All field must be entred')
            }
        }
        onMounted(async (params) => {
            await store.dispatch('auth/getUserById', route.query.userId)
        })
        return {
            capitalize,
            user,
            toggleEdit,
            cancel,
            editProfile,
            saveProfile,
            form,
            login,
            cancelLogin,
            updateLogin,
            notification,
            passwordStrength,
            checkUpdateButton,
            toggleUpdate,
        }
    },
}
</script>

<style></style>
