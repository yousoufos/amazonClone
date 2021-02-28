<template>
    <div class="">
        <div>
            <navbar title="List Categories"></navbar>
        </div>
        <div class="flex">
            <div><sidebar selected="Categories"></sidebar></div>
            <div class="width568 w-full h-screen overflow-y-auto">
                <div v-if="loading">loading....</div>
                <div v-else class="py-4 mx-auto flex flex-col w-11/12">
                    <div
                        class="flex mb-4 space-x-2 justify-center items-center rounded-md py-2 bg-gray-300 cursor-pointer"
                        :class="[add === false ? 'w-48' : 'w-80']"
                    >
                        <div
                            @click="addCategory"
                            v-if="add === false"
                            class="flex"
                        >
                            <span class="material-icons">
                                add_circle_outline
                            </span>
                            <span>New Category</span>
                        </div>
                        <div v-else class="px-2 space-x-2">
                            <input
                                v-model="newCategory"
                                class="rounded-md"
                                type="text"
                                ref="addInput"
                                @keyup.esc="cancelAdd($event)"
                            />
                            <button
                                @click="submit"
                                class="bg-white w-16 rounded-md"
                            >
                                Add
                            </button>
                        </div>
                    </div>
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
                                            v-for="(cat, i) in tab"
                                            :key="cat.id"
                                        >
                                            <td
                                                class="px-6 py-4 text-sm text-gray-500 cursor-pointer"
                                            >
                                                <span v-if="cat.editable"
                                                    ><input
                                                        :ref="
                                                            (el) => {
                                                                divs[i] = el
                                                            }
                                                        "
                                                        @keyup.enter="
                                                            edit(cat, i, $event)
                                                        "
                                                        @keyup.esc="
                                                            edit(cat, i, $event)
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
                                                    class="material-icons cursor-pointer text-red-500"
                                                >
                                                    delete_forever
                                                </span>
                                                <span
                                                    @click="
                                                        edit(cat, i, $event)
                                                    "
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
import { computed, onMounted, ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {
        navbar,
        sidebar,
    },
    methods: {
        /* test() {
            console.log('data')
            this.$refs.addInput.focus()
        }, */
    },
    setup() {
        const store = useStore()
        const editable = ref(false)
        let oldValue = []
        const loading = ref(true)
        const categories = ref(
            computed(() => {
                return store.state.category.categories
            })
        )
        const add = ref(false)
        const newCategory = ref('')
        const addInput = ref(null)
        const divs = ref([])

        const edit = (params, i, event) => {
            if (params.editable === false && event.key === undefined) {
                params.editable = true
                oldValue = JSON.parse(JSON.stringify(categories.value))
                setTimeout(() => {
                    console.log(divs.value[i])
                    divs.value[i].focus()
                }, 0.5)
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

        const addCategory = () => {
            add.value = true
            setTimeout((params) => {
                addInput.value.focus()
            }, 0.5)
        }
        const test = (params) => {
            addInput.value.focus()
        }
        const submit = (params) => {
            if (newCategory.value === '') {
                alert('Category field must be not empty')
            } else {
                store.dispatch('category/addCategory', newCategory.value)
                add.value = false
            }
        }
        const cancelAdd = (params) => {
            newCategory.value = ''
            add.value = false
        }

        const pas = ref(4)
        const categoriesLength = computed(() => {
            return categories.value.length
        })
        const numberRecords = computed(() => {
            return Math.ceil(categoriesLength.value / pas.value)
        })
        const start = ref(1)
        const tab = computed(() => {
            var indexStart = (start.value - 1) * pas.value

            var tableau = []

            for (var i = indexStart; i < indexStart + pas.value; i++) {
                if (typeof categories.value[i] !== 'undefined') {
                    tableau.push(categories.value[i])
                }
            }

            return tableau
        })
        const next = (params) => {
            start.value = params
        }

        onMounted(async (params) => {
            await store.dispatch('category/getCategories')
            loading.value = false
        })
        onBeforeUpdate(() => {
            divs.value = []
        })
        return {
            categories,
            editable,
            edit,
            remove,
            add,
            addCategory,
            submit,
            newCategory,
            addInput,
            cancelAdd,
            test,
            divs,
            next,
            tab,
            start,
            numberRecords,
            loading,
        }
    },
}
</script>

<style></style>
