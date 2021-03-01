<template>
    <div class="flex">
        <div><sidebar selected="Users"></sidebar></div>
        <div class="flex w-full">
            <div class="width568 w-full">
                <div v-if="loading">Loading...</div>
                <div v-else>
                    <div class="py-4 mx-auto flex flex-col w-11/12">
                        <div class="flex justify-center">
                            <div
                                @click="next(index + 1)"
                                class="border p-1 mx-1 mb-4 border-indigo-600 cursor-pointer"
                                :class="{
                                    'bg-yellow-500': item === start,
                                }"
                                v-for="(item, index) in numberRecords"
                                :key="index"
                            >
                                {{ item }}
                            </div>
                        </div>
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div
                                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
                            >
                                <div
                                    class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                                >
                                    <table
                                        class="min-w-full divide-y divide-gray-200"
                                    >
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Name
                                                </th>

                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Second Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Role
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Joining Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody
                                            class="bg-white divide-y divide-gray-200 cursor-pointer"
                                        >
                                            <tr
                                                v-for="user in tab"
                                                :key="user.userId"
                                                @click="details(user.userId)"
                                            >
                                                <td
                                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {{ user.email }}
                                                </td>
                                                <td
                                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {{ user.prenom }}
                                                </td>
                                                <td
                                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {{ user.nom }}
                                                </td>
                                                <td
                                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {{ user.role }}
                                                </td>

                                                <td
                                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {{ user.createdAt }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '../../../components/admin/navbar'
import sidebar from '../../../components/admin/sidebar'
import { computed, onMounted, ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    components: {
        navbar,
        sidebar,
    },

    setup() {
        const router = useRouter()
        const store = useStore()
        const loading = ref(true)
        const users = ref(
            computed(() => {
                return store.state.auth.users
            })
        )
        const details = ref((params) => {
            router.push({
                name: 'userDetails',
                query: {
                    userId: params,
                },
            })
        })
        const pas = ref(6)
        const usersLength = computed(() => {
            return users.value.length
        })
        const numberRecords = computed(() => {
            return Math.ceil(usersLength.value / pas.value)
        })
        const start = ref(1)
        const tab = computed(() => {
            var indexStart = (start.value - 1) * pas.value

            var tableau = []

            for (var i = indexStart; i < indexStart + pas.value; i++) {
                if (typeof users.value[i] !== 'undefined') {
                    tableau.push(users.value[i])
                }
            }

            return tableau
        })
        const next = (params) => {
            start.value = params
        }
        onMounted(async (params) => {
            await store.dispatch('auth/getUsers')
            loading.value = false
        })
        return {
            details,
            loading,
            users,
            start,
            tab,
            next,
            numberRecords,
        }
    },
}
</script>

<style></style>
