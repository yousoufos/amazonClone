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
                                <div class="p-2">
                                    <div v-if="alaune === ''">
                                        <div class="cursor-pointer">
                                            <label
                                                for="file"
                                                class="flex text-base font-medium text-blue-700 cursor-pointer"
                                                >Upload picture<span
                                                    class="px-2"
                                                    ><span
                                                        class="material-icons"
                                                    >
                                                        add_photo_alternate
                                                    </span></span
                                                >
                                            </label>
                                        </div>
                                        <input
                                            @change="
                                                onChange($event, 'picture')
                                            "
                                            type="file"
                                            name="file"
                                            accept="image/x-png,image/gif,image/jpeg"
                                            required
                                            class="hidden mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            id="file"
                                        />
                                    </div>

                                    <div v-if="loading" class="w-1/5">
                                        <div
                                            class="shadow w-full bg-grey-light"
                                        >
                                            <div
                                                class="bg-blue-600 text-xs leading-none py-1 text-center rounded-md"
                                                :style="{
                                                    width: progressBar + '%',
                                                }"
                                            >
                                                {{ progressBar + '%' }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        v-if="alaune !== ''"
                                        class="flex flex-wrap"
                                    >
                                        <div class="mt-2 mx-2">
                                            <div
                                                class="flex justify-between items-center"
                                            >
                                                <span
                                                    @click="
                                                        removePicture(
                                                            alaune,
                                                            false
                                                        )
                                                    "
                                                    class="material-icons cursor-pointer text-red-600 font-semibold"
                                                >
                                                    clear
                                                </span>
                                            </div>
                                            <img
                                                class="w-20 h-20"
                                                :src="alaune"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                                Picture
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
                                                    <div
                                                        v-if="
                                                            cat.picture !== ''
                                                        "
                                                        class="mt-2 mx-2"
                                                    >
                                                        <div
                                                            class="flex justify-between items-center"
                                                        >
                                                            <span
                                                                @click="
                                                                    removePicture(
                                                                        cat,
                                                                        true
                                                                    )
                                                                "
                                                                class="material-icons cursor-pointer text-red-600 font-semibold"
                                                            >
                                                                clear
                                                            </span>
                                                        </div>
                                                        <img
                                                            class="w-14 h-14"
                                                            :src="cat.picture"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div v-else>
                                                        <div
                                                            class="cursor-pointer"
                                                        >
                                                            <label
                                                                for="file"
                                                                class="flex text-base font-medium text-blue-700 cursor-pointer"
                                                                >Upload
                                                                picture<span
                                                                    class="px-2"
                                                                    ><span
                                                                        class="material-icons"
                                                                    >
                                                                        add_photo_alternate
                                                                    </span></span
                                                                >
                                                            </label>
                                                        </div>
                                                        <input
                                                            @change="
                                                                onChangeEdit(
                                                                    $event,
                                                                    cat,
                                                                    'picture'
                                                                )
                                                            "
                                                            type="file"
                                                            name="file"
                                                            accept="image/x-png,image/gif,image/jpeg"
                                                            required
                                                            class="hidden mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                            id="file"
                                                        />
                                                    </div>
                                                    <div
                                                        v-if="loading"
                                                        class="w-1/5"
                                                    >
                                                        <div
                                                            class="shadow w-full bg-grey-light"
                                                        >
                                                            <div
                                                                class="bg-blue-600 text-xs leading-none py-1 text-center rounded-md"
                                                                :style="{
                                                                    width:
                                                                        progressBar +
                                                                        '%',
                                                                }"
                                                            >
                                                                {{
                                                                    progressBar +
                                                                    '%'
                                                                }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <img
                                                        class="w-14 h-14"
                                                        :src="
                                                            cat.picture === ''
                                                                ? require('../../../assets/no-image.jpg')
                                                                : cat.picture
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
import { computed, onMounted, ref, onBeforeUpdate } from 'vue'
import { useStore } from 'vuex'
import { storage, firebaseApp, db } from '../../../firebase'
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
                    categoryId: params.id,
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
                removePicture(alaune.value, false)
            }
            if (banniere.value !== '') {
            }
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

        const onChange = (e, mode) => {
            file.value = e.target.files[0]
            if (mode === 'picture') {
                onUpload()
            } else {
            }
        }
        const onChangeEdit = (e, item, mode) => {
            file.value = e.target.files[0]
            if (mode === 'picture') {
                onUpload(true, item)
            } else {
            }
        }
        const refi = db.collection('category').doc()
        const id = refi.id
        const file = ref(null)
        const alaune = ref('')
        const banniere = ref('')
        const loading = ref(false)
        const progressBar = ref(0)
        const loadingEdit = ref(false)
        const onUpload = (edit = false, item) => {
            loading.value = true
            progressBar.value = 0
            var catId = edit === true ? item.id : id
            console.log(catId)
            var storageRef = storage.ref(
                'categories/' + catId + '/' + file.value.name
            )
            let uploadedFile = storageRef.put(file.value)
            // Listen for state changes, errors, and completion of the upload.
            uploadedFile.on(
                'state_changed', // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    progressBar.value = progress.toFixed(0)
                    console.log('Upload is ' + progress.toFixed(0) + '% done')
                    switch (snapshot.state) {
                        case 'paused': // or 'paused'
                            console.log('Upload is paused')
                            break
                        case 'running': // or 'running'
                            console.log('Upload is running')
                            break
                    }
                },
                function (error) {
                    // A full list of error codes is available at
                    // https://google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break

                        case 'storage/canceled':
                            // User canceled the upload
                            break

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break
                    }
                },
                function () {
                    // Upload completed successfully, now we can get the download URL
                    uploadedFile.snapshot.ref
                        .getDownloadURL()
                        .then(function (downloadURL) {
                            if (edit) {
                                console.log(item.id)
                                categories.value.find((params) => {
                                    return params.id === item.id
                                }).picture = downloadURL

                                store.dispatch('category/updateCategory', {
                                    categoryId: item.id,
                                    picture: downloadURL,
                                    name: item.name,
                                    categories: categories.value,
                                    banniere: banniere.value,
                                })
                            } else {
                                alaune.value = downloadURL
                            }

                            loading.value = false
                        })
                }
            )
        }
        const onUploadBanniere = (edit = false, item) => {
            loading.value = true
            progressBar.value = 0
            var catId = edit === true ? item.id : id
            console.log(catId)
            var storageRef = storage.ref(
                'categories/' + catId + '/' + file.value.name
            )
            let uploadedFile = storageRef.put(file.value)
            // Listen for state changes, errors, and completion of the upload.
            uploadedFile.on(
                'state_changed', // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    progressBar.value = progress.toFixed(0)
                    console.log('Upload is ' + progress.toFixed(0) + '% done')
                    switch (snapshot.state) {
                        case 'paused': // or 'paused'
                            console.log('Upload is paused')
                            break
                        case 'running': // or 'running'
                            console.log('Upload is running')
                            break
                    }
                },
                function (error) {
                    // A full list of error codes is available at
                    // https://google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break

                        case 'storage/canceled':
                            // User canceled the upload
                            break

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break
                    }
                },
                function () {
                    // Upload completed successfully, now we can get the download URL
                    uploadedFile.snapshot.ref
                        .getDownloadURL()
                        .then(function (downloadURL) {
                            if (edit) {
                                console.log(item.id)
                                categories.value.find((params) => {
                                    return params.id === item.id
                                }).banniere = downloadURL

                                store.dispatch('category/updateCategory', {
                                    categoryId: item.id,
                                    picture: alaune.value,
                                    name: item.name,
                                    categories: categories.value,
                                    banniere: downloadURL,
                                })
                            } else {
                                alaune.value = downloadURL
                            }

                            loading.value = false
                        })
                }
            )
        }
        const removePicture = (item, edit) => {
            var pictureRef = edit === true ? item.picture : item
            var httpsReference = storage.refFromURL(pictureRef)
            httpsReference
                .delete()
                .then(function () {
                    alaune.value = ''
                    if (edit) {
                        categories.value.find((params) => {
                            return params.id === item.id
                        }).picture = ''
                        store.dispatch('category/updateCategory', {
                            categoryId: item.id,
                            picture: '',
                            name: item.name,
                            categories: categories.value,
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        const removeBanniere = (item, edit) => {
            var pictureRef = edit === true ? item.banniere : item
            var httpsReference = storage.refFromURL(pictureRef)
            httpsReference
                .delete()
                .then(function () {
                    banniere.value = ''
                    if (edit) {
                        categories.value.find((params) => {
                            return params.id === item.id
                        }).banniere = ''
                        store.dispatch('category/updateCategory', {
                            categoryId: item.id,
                            picture: item.picture,
                            name: item.name,
                            categories: categories.value,
                            banniere: '',
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

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
            next,
            tab,
            start,
            numberRecords,
            loadingPage,
            fileTab,
            onChange,
            file,
            onUpload,
            loading,
            progressBar,
            removePicture,
            alaune,
            loadingEdit,
            onChangeEdit,
            banniere,
            removeBanniere,
        }
    },
}
</script>

<style></style>
