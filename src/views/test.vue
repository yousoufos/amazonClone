<template>
    <div class="flex flex-col">
        <input
            @change="onChange"
            type="file"
            name=""
            id=""
            accept="image/x-png,image/gif,image/jpeg"
        />
        <div>
            <button class="bg-yellow-500" @click="onUpload">Upload</button>
        </div>

        <div v-if="loading" class="w-1/5">
            <div class="shadow w-full bg-grey-light">
                <div
                    class="bg-blue-600 text-xs leading-none py-1 text-center"
                    :style="{ width: progressBar + '%' }"
                >
                    {{ progressBar + '%' }}
                </div>
            </div>
        </div>
    </div>
    <div>
        <select
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
        </select>
        <span>Sélectionné : {{ selected }}</span>
    </div>
    <div>
        <ul>
            <li v-for="elem in productCategory" :key="elem.productId">
                {{ elem.title }}
            </li>
        </ul>
    </div>

    <!-- <div class="lg:w-1/2">
        <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
        ></ckeditor>
    </div> -->
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { storage, firebaseApp, db } from '../firebase'
import spin from '../components/Spin'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useStore } from 'vuex'
export default {
    components: { spin },

    setup() {
        const store = useStore()
        const file = ref(null)
        const loading = ref(false)
        const progressBar = ref(0)
        const onChange = (e) => (file.value = e.target.files[0])
        const onUpload = () => {
            loading.value = true
            progressBar.value = 0
            var storageRef = storage.ref('products/' + file.value.name)
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
                            loading.value = false
                            console.log('File available at', downloadURL)
                        })
                }
            )
        }

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
        const selected = ref(null)

        const onSelected = (categoryId) => {
            productCategory.value = []
            db.collection('productCategory')
                .where('categoryId', '==', categoryId)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        let obj = { id: doc.id, data: doc.data() }
                        // doc.data() is never undefined for query doc snapshots

                        db.collection('product')
                            .doc(obj.data.productId)
                            .get()
                            .then(function (query) {
                                if (query.exists) {
                                    productCategory.value.push(query.data())
                                }
                            })
                    })
                    console.log(productCategory.value)
                })
                .catch(function (error) {
                    console.log('Error getting documents: ', error)
                })
        }

        const fetchCaterories = () => {
            /* db.collection('category')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(function (doc) {
                        category.value.push({ id: doc.id, data: doc.data() })
                    })
                    console.log(category.value)
                }) */
            store.dispatch('category/getCategories')
        }

        onMounted(() => {
            fetchCaterories()
        })

        return {
            file,
            onUpload,
            onChange,
            loading,
            progressBar,
            category,
            selected,
            onSelected,
            productCategory,
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
