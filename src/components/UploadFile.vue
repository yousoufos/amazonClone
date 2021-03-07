<template>
    <div class="p-2">
        <div v-if="picture === ''">
            <div class="cursor-pointer">
                <label
                    :for="name"
                    class="flex text-base font-medium text-blue-700 cursor-pointer"
                    >{{ label
                    }}<span class="px-2"
                        ><span class="material-icons">
                            add_photo_alternate
                        </span></span
                    >
                </label>
            </div>
            <input
                @change="onChange"
                type="file"
                :name="name"
                accept="image/x-png,image/gif,image/jpeg"
                required
                class="hidden mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                :id="name"
            />
        </div>

        <div v-if="loading" class="w-1/5">
            <div class="shadow w-full bg-grey-light">
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
        <div v-if="picture !== ''" class="flex flex-wrap">
            <div class="mt-2 mx-2">
                <div class="flex justify-between items-center">
                    <span
                        @click="remove(picture)"
                        class="material-icons cursor-pointer text-red-600 font-semibold"
                    >
                        clear
                    </span>
                </div>
                <img class="w-20 h-20" :src="picture" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
const makeId = () => {
    let ID = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (var i = 0; i < 12; i++) {
        ID += characters.charAt(Math.floor(Math.random() * 36))
    }
    return ID
}
import { ref, computed } from 'vue'
import { storage, firebaseApp, db } from '../firebase'
export default {
    props: {
        picture: String,
        id: String,
        collection: String,
        label: String,
    },
    setup(props, { emit }) {
        const name = ref(makeId())
        const loading = ref(false)
        const file = ref(null)
        const progressBar = ref(0)
        const onChange = (e) => {
            file.value = e.target.files[0]
            onUpload()
        }

        const onUpload = () => {
            loading.value = true
            progressBar.value = 0

            var storageRef = storage.ref(
                props.collection + '/' + props.id + '/' + file.value.name
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
                            emit('uploadFinished', downloadURL)
                            loading.value = false
                        })
                }
            )
        }
        const remove = (item) => {
            var httpsReference = storage.refFromURL(item)
            httpsReference
                .delete()
                .then(function () {
                    emit('pictureDeleted', item, props.id)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        return {
            loading,
            progressBar,
            remove,
            onChange,
            name,
        }
    },
}
</script>

<style></style>
