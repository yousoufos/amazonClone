<template>
    <div class="flex">
        <div><sidebar selected="Categories"></sidebar></div>
        <div class="flex w-full">
            <div class="width568 w-full h-screen overflow-y-auto">
                <div v-if="loadingPage">loading....</div>
                <div v-else class="py-4 mx-auto flex flex-col w-11/12">
                    <div
                        class="flex mb-4 space-x-2 justify-center items-center rounded-md py-2 bg-gray-300 cursor-pointer"
                        :class="[add === false ? 'w-48' : 'w-96']"
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
                        <div v-else class="flex flex-col">
                            <div class="px-2 space-x-2">
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
                                <button
                                    @click="cancelAdd"
                                    class="bg-white w-16 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                            <div>
                                <UploadFile
                                    @pictureDeleted="pictureCategoryDeleted"
                                    @uploadFinished="pictureCategoryUpload"
                                    :picture="alaune"
                                    collection="categories"
                                    :id="id"
                                    label="Upload Picture"
                                ></UploadFile>
                                <UploadFile
                                    @pictureDeleted="banniereCategoryDeleted"
                                    @uploadFinished="banniereCategoryUpload"
                                    :picture="banniere"
                                    collection="categories"
                                    :id="id"
                                    label="Upload Banner"
                                ></UploadFile>
                            </div>
                        </div>
                    </div>
                    <Pagination
                        ref="child"
                        :pas="3"
                        type="categories"
                        :data="categories"
                    ></Pagination>
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
                                                Picture
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Banner
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
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                <div
                                                    class="flex flex-wrap"
                                                    v-if="cat.editable"
                                                >
                                                    <UploadFile
                                                        @pictureDeleted="
                                                            pictureCategoryDeletedEdit
                                                        "
                                                        @uploadFinished="
                                                            pictureCategoryUploadEdit(
                                                                $event,
                                                                cat.id
                                                            )
                                                        "
                                                        :picture="cat.picture"
                                                        collection="categories"
                                                        :id="cat.id"
                                                        label="Upload Picture"
                                                    ></UploadFile>
                                                </div>
                                                <div v-else>
                                                    <img
                                                        class="rounded-full w-20 h-20"
                                                        :src="
                                                            cat.picture === ''
                                                                ? require('../../../assets/no-image.jpg')
                                                                : cat.picture
                                                        "
                                                    />
                                                </div>
                                            </td>
                                            <td
                                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            >
                                                <div
                                                    class="flex flex-wrap"
                                                    v-if="cat.editable"
                                                >
                                                    <UploadFile
                                                        @pictureDeleted="
                                                            banniereCategoryDeletedEdit
                                                        "
                                                        @uploadFinished="
                                                            banniereCategoryUploadEdit(
                                                                $event,
                                                                cat.id
                                                            )
                                                        "
                                                        :picture="cat.banniere"
                                                        collection="categories"
                                                        :id="cat.id"
                                                        label="Upload Banner"
                                                    ></UploadFile>
                                                </div>
                                                <div v-else>
                                                    <img
                                                        class="rounded-full w-20 h-20"
                                                        :src="
                                                            cat.banniere === ''
                                                                ? require('../../../assets/no-image.jpg')
                                                                : cat.banniere
                                                        "
                                                    />
                                                </div>
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
import UploadFile from '../../../components/UploadFile'
import Pagination from '../../../components/Pagination'
import { computed, onMounted, ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
import { storage, firebaseApp, db } from '../../../firebase'
export default {
    components: {
        navbar,
        sidebar,
        UploadFile,
        Pagination,
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
        const refi = db.collection('category').doc()
        const id = ref(refi.id)
        const loadingPage = ref(true)
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
                    divs.value[i].focus()
                }, 0.5)
            } else if (params.editable === true && event.key === 'Enter') {
                let cat = categories.value.indexOf(params)
                if (
                    oldValue[cat].name === categories.value[cat].name &&
                    oldValue[cat].picture === categories.value[cat].picture &&
                    oldValue[cat].banniere === categories.value[cat].banniere
                ) {
                    console.log('No changes')
                    params.editable = false
                    return
                }
                store.dispatch('category/updateCategory', {
                    id: params.id,
                    name: params.name,
                    picture: params.picture,
                    categories: categories.value,
                    banniere: params.banniere,
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
                store.dispatch('category/addCategory', {
                    ref: refi,
                    name: newCategory.value,
                    picture: alaune.value,
                    banniere: banniere.value,
                })
                add.value = false
            }
        }
        const cancelAdd = (params) => {
            newCategory.value = ''
            if (alaune.value !== '') {
                removePicture(alaune.value)
                alaune.value = ''
            }
            if (banniere.value !== '') {
                removePicture(banniere.value)
                banniere.value = ''
            }
            add.value = false
        }
        const alaune = ref('')
        const banniere = ref('')
        const getKeyByValue = (object, value) => {
            return Object.keys(object).find((key) => object[key] === value)
        }
        const removePicture = (item, catId) => {
            var httpsReference = storage.refFromURL(item)
            httpsReference
                .delete()
                .then(function () {})
                .catch(function (error) {
                    console.log(error)
                })
        }

        const pictureCategoryUpload = (downloadURL) => {
            alaune.value = downloadURL
        }

        const updateCategoryTab = (item, catId) => {
            if (
                typeof categories.value.find((params) => {
                    return params.id === catId
                }) !== 'undefined'
            ) {
                var obj = categories.value.find((params) => {
                    return params.id === catId
                })
                console.log(obj)
                obj[getKeyByValue(obj, item)] = ''
                store.dispatch('category/updateCategory', {
                    ...obj,
                    categories: categories.value,
                })
            }
        }
        const pictureCategoryDeleted = (item, catId) => {
            alaune.value = ''
            updateCategoryTab(item, catId)
        }
        const pictureCategoryDeletedEdit = (item, id) => {
            updateCategoryTab(item, id)
        }
        const banniereCategoryUpload = (downloadURL) => {
            banniere.value = downloadURL
        }

        const banniereCategoryDeleted = (item, catId) => {
            banniere.value = ''
            updateCategoryTab(item, catId)
        }
        const banniereCategoryDeletedEdit = (item, id) => {
            updateCategoryTab(item, id)
        }

        const pictureCategoryUploadEdit = (e, id) => {
            var obj = categories.value.find((params) => {
                return params.id === id
            })
            categories.value.find((params) => {
                return params.id === id
            }).picture = e

            store.dispatch('category/updateCategory', {
                id: id,
                picture: e,
                name: obj.name,
                categories: categories.value,
                banniere: obj.banniere,
            })
        }
        const banniereCategoryUploadEdit = (e, id) => {
            var obj = categories.value.find((params) => {
                return params.id === id
            })
            categories.value.find((params) => {
                return params.id === id
            }).banniere = e

            store.dispatch('category/updateCategory', {
                id: id,
                picture: obj.picture,
                name: obj.name,
                categories: categories.value,
                banniere: e,
            })
        }
        const tab = computed(() => {
            return store.getters['navigation/getCategoriesPagination']
        })
        onMounted(async (params) => {
            await store.dispatch('category/getCategories')
            loadingPage.value = false
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
            tab,
            loadingPage,
            removePicture,
            alaune,
            banniere,
            id,
            pictureCategoryDeleted,
            pictureCategoryDeletedEdit,
            pictureCategoryUpload,
            pictureCategoryUploadEdit,
            banniereCategoryDeleted,
            banniereCategoryDeletedEdit,
            banniereCategoryUpload,
            banniereCategoryUploadEdit,
        }
    },
}
</script>

<style></style>
