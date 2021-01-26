<template>
    <div class="">
        <div>
            <navbar title="New Product"></navbar>
        </div>
        <div class="flex">
            <div><sidebar selected="Product"></sidebar></div>
            <div class="width568">
                <div class="">
                    <form @submit.prevent class="">
                        <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="title"
                                            class="block text-sm font-medium text-gray-700"
                                            >Title</label
                                        >
                                        <input
                                            type="text"
                                            name="title"
                                            v-model="form.title"
                                            required
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <MultiSelect
                                            ref="children"
                                            :category="category"
                                            types="new"
                                        ></MultiSelect>
                                        <!-- <select
                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                @change="onSelected(selected)"
                                v-model="selected"
                            >
                                <option
                                    v-for="option in category"
                                    :key="option.id"
                                    v-bind:value="option.id"
                                >
                                    {{ option.name }}
                                </option>
                            </select> -->
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="description"
                                            class="block text-sm font-medium text-gray-700"
                                            >Details</label
                                        >
                                        <ckeditor
                                            :editor="editor"
                                            v-model="form.description"
                                            :config="editorConfig"
                                        ></ckeditor>
                                    </div>

                                    <div class="col-span-3">
                                        <label
                                            for="price"
                                            class="block text-sm font-medium text-gray-700"
                                            >Price</label
                                        >
                                        <input
                                            type="number"
                                            name="price"
                                            v-model="form.price"
                                            required
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div class="col-span-3">
                                        <label
                                            for="stock"
                                            class="block text-sm font-medium text-gray-700"
                                            >Stock</label
                                        >
                                        <input
                                            type="number"
                                            name="stock"
                                            v-model="form.stock"
                                            required
                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div
                                        class="col-span-6 sm:col-span-6 lg:col-span-2"
                                    >
                                        <div class="cursor-pointer">
                                            <label
                                                for="file"
                                                class="flex text-sm font-medium text-gray-700 cursor-pointer"
                                                >Upload picture<span
                                                    class="px-2"
                                                    ><svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="black"
                                                        width="18px"
                                                        height="18px"
                                                    >
                                                        <path
                                                            d="M0 0h24v24H0z"
                                                            fill="none"
                                                        />
                                                        <path
                                                            d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"
                                                        /></svg
                                                ></span>
                                            </label>
                                        </div>
                                        <input
                                            @change="onChange"
                                            type="file"
                                            name="file"
                                            accept="image/x-png,image/gif,image/jpeg"
                                            required
                                            class="hidden mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            id="file"
                                        />
                                        <!-- <button
                                class="mt-2 font-semibold bg-yellow-500 w-20"
                                @click="onUpload"
                            >
                                Upload
                            </button> -->
                                        <div v-if="loading" class="w-1/5">
                                            <div
                                                class="shadow w-full bg-grey-light"
                                            >
                                                <div
                                                    class="bg-blue-600 text-xs leading-none py-1 text-center rounded-md"
                                                    :style="{
                                                        width:
                                                            progressBar + '%',
                                                    }"
                                                >
                                                    {{ progressBar + '%' }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-wrap">
                                            <div
                                                v-for="img in fileTab"
                                                class="mt-2 mx-2"
                                            >
                                                <div
                                                    class="flex justify-between items-center"
                                                >
                                                    <span class=""
                                                        ><button
                                                            @click="
                                                                removePicture(
                                                                    img
                                                                )
                                                            "
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                                class="h-4 w-4"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg></button
                                                    ></span>
                                                    <span>
                                                        <label
                                                            class="text-xs px-1"
                                                            for="one"
                                                            >Default</label
                                                        >
                                                        <input
                                                            checked
                                                            name="picture"
                                                            type="radio"
                                                            id="one"
                                                            :value="img"
                                                            v-model="alaune"
                                                        />
                                                    </span>
                                                </div>
                                                <img
                                                    class="w-20 h-20"
                                                    :src="img"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="px-4 py-3 bg-gray-50 text-right sm:px-6"
                            >
                                <button
                                    @click="onSubmit"
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
            </div>
        </div>
    </div>
</template>

<script>
import navbar from '../../../components/admin/navbar'
import sidebar from '../../../components/admin/sidebar'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { ref, reactive, onMounted, computed } from 'vue'
import { storage, firebaseApp, db } from '../../../firebase'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import MultiSelect from '../../../components/MultiSelect.vue'
import notif from '../../../components/notif.vue'
export default {
    components: {
        navbar,
        sidebar,
        MultiSelect,
        notif,
    },
    setup() {
        const form = reactive({
            title: '',
            description: '',
            price: '',
            stock: '',
        })
        const router = useRouter()
        const store = useStore()
        const file = ref(null)
        const fileTab = ref([])
        const alaune = ref('')
        const loading = ref(false)
        const progressBar = ref(0)
        const refi = db.collection('product').doc()
        const id = refi.id
        const children = ref(null)
        const onChange = (e) => {
            file.value = e.target.files[0]
            onUpload()
        }
        const onUpload = () => {
            loading.value = true
            progressBar.value = 0

            var storageRef = storage.ref(
                'products/' + id + '/' + file.value.name
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
                            fileTab.value.push(downloadURL)
                            alaune.value = downloadURL
                            loading.value = false
                        })
                }
            )
        }

        const removePicture = (item) => {
            var httpsReference = storage.refFromURL(item)
            httpsReference
                .delete()
                .then(function () {
                    fileTab.value.splice(fileTab.value.indexOf(item), 1)
                    if (fileTab.value.length === 0) {
                        alaune.value = ''
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        const onSubmit = () => {
            /* if ((typeof form.price && typeof form.stock) !== 'number') {
                alert('Price or stock must be a number')
                return
            } */

            if (
                (form.title && form.description && form.price && form.stock) !==
                ''
            ) {
                let product = {
                    title: form.title,
                    description: form.description,
                    price: form.price,
                    stock: form.stock,
                    rating: 4,
                    pictures: fileTab.value,
                    defaultPicture: alaune.value,
                }
                store.dispatch('product/createProduct', {
                    ref: refi,
                    product: product,
                    productCategory: {
                        productId: id,
                        categories: children.value.selectedOptions,
                    },
                })
                resetForm()
            } else {
                alert('All fields must be entred')
            }
        }
        const resetForm = () => {
            form.title = ''
            form.description = ''
            form.price = ''
            form.stock = ''
            fileTab.value = []
            alaune.value = ''
            children.value.selectedOptions = []
        }
        const removeAllPictures = () => {
            if (fileTab.value.length !== 0) {
                fileTab.value.forEach((item) => {
                    removePicture(item)
                })
            }
        }
        const selected = ref('')
        const productCategory = ref([])
        const category = ref(
            computed(() => {
                if (store.state.category.categories === null) {
                    return [{ id: '', data: { name: '' } }]
                } else {
                    return store.state.category.categories
                }
            })
        )
        const fetchCaterories = () => {
            store.dispatch('category/getCategories')
        }
        const onSelected = (categoryId) => {}
        const cancel = () => {
            removeAllPictures()
            resetForm()
            router.push('/admin/product/listproduct')
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

        onMounted(() => {
            fetchCaterories()
        })

        return {
            fileTab,
            onChange,
            file,
            onUpload,
            loading,
            progressBar,
            removePicture,
            onSubmit,
            form,
            alaune,
            category,
            selected,
            onSelected,
            children,
            cancel,
            notification,
        }
    },
    data() {
        return {
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    'blockQuote',
                ],
            },
        }
    },
}
</script>

<style></style>
