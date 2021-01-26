<template>
    <div class="flex flex-col space-y-2">
        <div
            class="mx-auto w-1/2 text-center bg-green-400"
            v-for="cat in tabCat"
        >
            {{ cat.name }}
        </div>
        <div v-if="loading" class="mx-auto w-1/2 text-center">Loading...</div>

        <div class="mx-auto w-1/2 justify-between flex">
            <span
                ><button @click="previous" class="bg-yellow-400 px-2">
                    Prev
                </button></span
            >
            <span
                ><button
                    :disabled="nextDisabled"
                    @click="next"
                    class="bg-yellow-400 px-2"
                >
                    Next
                </button></span
            >
        </div>
        <div>
            <input v-model="date" type="text" />
            <button @click="convert">date</button>
            <span>{{ convertDate }}</span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { getOrders } from '../database/order'
import moment from 'moment'
export default {
    setup() {
        const tabCat = ref([])
        const lastDoc = ref(null)
        const loading = ref(false)
        const nextDisabled = ref(false)
        const next = () => {
            loading.value = true
            db.collection('category')
                .orderBy('name')
                .startAfter(lastDoc.value)
                .limit(2)
                .get()
                .then((doc) => {
                    console.log(doc.size)
                    if (doc.size === 0) {
                        nextDisabled.value = true
                        loading.value = false
                        return
                    } else {
                        tabCat.value = [...doc.docs.map((cat) => cat.data())]

                        lastDoc.value = doc.docs[doc.docs.length - 1]
                        loading.value = false
                    }
                })
        }
        const previous = (params) => {
            db.collection('category')
                .orderBy('name')
                .endBefore(lastDoc.value)
                .limit(2)
                .get()
                .then((doc) => {
                    console.log(doc.size)
                    tabCat.value = [...doc.docs.map((cat) => cat.data())]
                    lastDoc.value = doc.docs[doc.docs.length - 1]
                })
        }
        onMounted(async (params) => {
            await db
                .collection('category')
                .orderBy('name')
                .limit(2)
                .get()
                .then((doc) => {
                    tabCat.value = doc.docs.map((cat) => cat.data())
                    lastDoc.value = doc.docs[doc.docs.length - 1]
                })

            await getOrders()
        })

        const date = ref('1610277857628')
        const convertDate = ref('')
        const convert = (params) => {
            convertDate.value = moment(date).format('LL')
            console.log(convertDate.value)
        }

        return {
            tabCat,
            next,
            loading,
            nextDisabled,
            previous,
            date,
            convertDate,
            convert,
        }
    },
}
</script>

<style></style>
