<template>
    <div class="">
        <div>
            <navbar title="List Categories"></navbar>
        </div>
        <div class="flex">
            <div><sidebar></sidebar></div>
            <div class="w-full">
                <div class="py-4 mx-auto flex flex-col w-11/12">
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
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="bg-white divide-y divide-gray-200"
                                    >
                                        <tr
                                            v-for="cat in categories"
                                            :key="cat.id"
                                        >
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 cursor-pointer"
                                            >
                                                <span v-if="cat.editable"
                                                    ><input
                                                        @keyup.enter="
                                                            edit(cat, $event)
                                                        "
                                                        @keyup.esc="
                                                            edit(cat, $event)
                                                        "
                                                        v-model="cat.name"
                                                        type="text"
                                                /></span>
                                                <span v-else>{{
                                                    cat.name
                                                }}</span>
                                            </td>

                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2"
                                            >
                                                <span
                                                    @click="remove(cat)"
                                                    class="material-icons cursor-pointer"
                                                >
                                                    delete_forever
                                                </span>
                                                <span
                                                    @click="edit(cat, $event)"
                                                    class="material-icons cursor-pointer"
                                                >
                                                    edit
                                                </span>
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
</template>

<script>
import navbar from '../../../components/admin/navbar'
import sidebar from '../../../components/admin/sidebar'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        navbar,
        sidebar,
    },
    setup() {
        const store = useStore()
        const editable = ref(false)
        let oldValue = []
        const categories = ref(
            computed(() => {
                return store.state.category.categories
            })
        )

        const edit = (params, event) => {
            if (params.editable === false && event.key === undefined) {
                params.editable = true
                oldValue = JSON.parse(JSON.stringify(categories.value))
            } else if (params.editable === true && event.key === 'Enter') {
                let cat = categories.value.indexOf(params)
                if (oldValue[cat].name === categories.value[cat].name) {
                    console.log('No changes')
                    params.editable = false
                    return
                }
                store.dispatch('category/updateCategory', {
                    categoryId: params.id,
                    name: params.name,
                    categories: categories.value,
                })
                console.log('enter pressed')
                params.editable = false
            } else if (params.editable === true && event.key === 'Escape') {
                store.dispatch('category/setCategories', oldValue)
                console.log('escape pressed')
                params.editable = false
            } else {
                params.editable = false
            }
        }
        const remove = (params) => {
            if (confirm('Do you really want to remove this category?')) {
                store.dispatch('category/deleteCategory', {
                    categoryId: params.id,
                })
            } else return
        }

        onMounted(async (params) => {
            await store.dispatch('category/getCategories')
        })
        return {
            categories,
            editable,
            edit,
            remove,
        }
    },
}
</script>

<style></style>
