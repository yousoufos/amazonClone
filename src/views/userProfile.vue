<template>
    <div>
        <div>
            <transition
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutLeft"
            >
                <Notif
                    v-if="notification.show"
                    :notification="notification"
                    :show="notification.show"
                />
            </transition>
        </div>
        <div class="p-4 space-y-2 lg:w-1/2 lg:mx-auto">
            <div @click="deleting" v-if="from.length > 0">
                <router-link :to="from[from.length - 1]"
                    ><span class="text-4xl material-icons">
                        keyboard_backspace
                    </span></router-link
                >
            </div>
            <div class="flex items-center bg-gray-100">
                <span class="text-gray-700 material-icons">
                    account_circle
                </span>
                <p class="py-2 font-semibold text-gray-700">Your profile</p>
            </div>
            <div class="p-2 bg-gray-100">
                <div class="space-y-2 text-sm">
                    <div>
                        <p v-if="toggleEdit">
                            {{
                                capitalize(user.prenom) +
                                ', ' +
                                capitalize(user.nom)
                            }}
                        </p>
                        <div v-else class="flex flex-col space-y-2">
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
                                class="w-full p-2 bg-yellow-500 rounded-md"
                            >
                                Edit
                            </button>
                        </div>
                        <div v-else class="flex space-x-4">
                            <button
                                @click="saveProfile"
                                class="w-full p-2 bg-yellow-500 rounded-md"
                            >
                                Save
                            </button>
                            <button
                                @click="cancel"
                                class="w-full p-2 bg-yellow-500 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center space-x-1 bg-gray-100">
                <span class="text-gray-700 material-icons"> vpn_key </span>
                <p class="py-2 font-semibold text-gray-700">Reset Password</p>
            </div>
            <div class="flex flex-col p-2 space-y-4 text-sm bg-gray-100">
                <div class="flex flex-col">
                    <InputPassword
                        type="password"
                        placeholder="Old password"
                        class="w-full rounded-md"
                        v-model="login.currentPwd"
                    ></InputPassword>
                </div>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <InputPassword
                            type="password"
                            placeholder="New password"
                            class="w-full rounded-md"
                            v-model="login.newPwd"
                        ></InputPassword>

                        <div
                            v-if="login.newPwd !== ''"
                            class="p-1 mt-1 rounded-md"
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
                        <InputPassword
                            type="password"
                            placeholder="Confirm password"
                            v-model="login.verifyPwd"
                            class="w-full rounded-md"
                        ></InputPassword>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button
                        :disabled="toggleUpdate"
                        @click="updateLogin"
                        class="w-full p-2 bg-yellow-500 rounded-md"
                        :class="{ 'disabled:opacity-50': toggleUpdate }"
                    >
                        Update
                    </button>
                    <button
                        @click="cancelLogin"
                        class="w-full p-2 bg-yellow-500 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputPassword from '../components/InputPassword'
import { ref, computed, onMounted, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import passwordStrength from 'check-password-strength'
export default {
    components: {
        InputPassword,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const toggleEdit = ref(true)
        const login = reactive({
            currentPwd: '',
            newPwd: '',
            verifyPwd: '',
        })
        const toggleUpdate = ref(true)
        watchEffect((params) => {
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
        })
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
            toggleUpdate.value = true
            router.push({
                name: 'Home',
            })
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
                            await store.dispatch(
                                'auth/updatePassword',
                                login.newPwd
                            )
                            login.currentPwd = ''
                            login.newPwd = ''
                            login.verifyPwd = ''
                        } else {
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
        const deleting = (params) => {
            store.commit('navigation/removeFrom')
        }
        const from = ref(
            computed((params) => {
                if (typeof store.state.navigation.from === 'undefined') {
                    return []
                } else {
                    return store.state.navigation.from
                }
            })
        )
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
            from,
            deleting,
        }
    },
}
</script>

<style></style>
