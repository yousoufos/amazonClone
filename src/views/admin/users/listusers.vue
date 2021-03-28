<template>
    <div class="flex">
        <div><Sidebar selected="Users" /></div>
        <div class="flex w-full">
            <div class="w-full width568">
                <div v-if="loading"><Spin /></div>
                <div v-else>
                    <div class="flex flex-col w-11/12 py-4 mx-auto">
                        <Pagination
                            ref="child"
                            :pas="10"
                            type="users"
                            :data="users"
                        />
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div
                                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                            >
                                <div
                                    class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
                                >
                                    <table
                                        class="min-w-full divide-y divide-gray-200"
                                    >
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                >
                                                    Name
                                                </th>

                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                >
                                                    Second Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                                >
                                                    Role
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
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
                                                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                                >
                                                    {{ user.email }}
                                                </td>
                                                <td
                                                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                                >
                                                    {{ user.prenom }}
                                                </td>
                                                <td
                                                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                                >
                                                    {{ user.nom }}
                                                </td>
                                                <td
                                                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                                >
                                                    {{ user.role }}
                                                </td>

                                                <td
                                                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
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
import { computed, onMounted, ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    components: {},

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
        const tab = computed((params) => {
            return store.getters['navigation/getUsersPagination']
        })
        onMounted(async (params) => {
            await store.dispatch('auth/getUsers')
            loading.value = false
        })
        return {
            details,
            loading,
            users,
            tab,
        }
    },
}
</script>

<style></style>
