<template>
    <div class="w-full mx-auto">
        <div
            class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            :class="{ 'flex-grow': toggle }"
        >
            <div class="flex flex-wrap">
                <span
                    v-if="placeholder"
                    class="block text-sm font-medium text-gray-700"
                    >Choose your category</span
                >
                <div v-if="loading">Loading...</div>
                <div
                    v-else
                    v-for="item in option"
                    :key="item.id"
                    class="flex bg-green-400 rounded-lg p-1 m-2"
                >
                    <span class="text-sm font-medium">{{ item.data.name }}</span
                    ><span class="px-1" @click="removeTag(item)"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="h-3 w-3"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            /></svg
                    ></span>
                </div>
            </div>
            <span
                @click="toggleList"
                class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2"
            >
                <!-- Heroicon name: selector -->
                <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </span>
        </div>
        <div
            v-if="showList"
            class="bg-gray-200 mt-1 rounded-sm h-24 overflow-auto px-4"
        >
            <ul>
                <li
                    @click="selectCategory(option)"
                    class="py-1 cursor-default block text-sm font-medium text-gray-700"
                    v-for="option in category"
                    :key="option.id"
                >
                    {{ option.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, computed, watchEffect, onMounted } from 'vue'

export default {
    props: {
        category: Object,
        selectedCategories: Object,
        types: String,
    },
    setup(props) {
        const toggle = ref(false)
        const loading = ref(true)
        const showList = ref(false)
        const selectedOptions = ref(
            props.types === 'edit' ? props.selectedCategories : []
        )
        console.log(props.selectedCategories.length)
        const placeholder = ref(
            computed(() => {
                if (option.value.length === 0) {
                    return true
                } else {
                    return false
                }
            })
        )
        const option = ref(
            computed(() => {
                return selectedOptions.value
            })
        )

        const removeTag = (item) => {
            selectedOptions.value.splice(selectedOptions.value.indexOf(item), 1)
            if (selectedOptions.value.length === 0) {
                showList.value = false
            }
        }

        const toggleList = () => {
            showList.value = !showList.value
        }

        const selectCategory = (item) => {
            if (selectedOptions.value.indexOf(item) === -1) {
                selectedOptions.value.push({
                    id: item.id,
                    data: { name: item.name },
                })
            }
        }
        onMounted(() => {
            setTimeout(() => {
                toggle.value = true
                selectedOptions.value.push({
                    id: '1',
                    data: { name: '' },
                })
                selectedOptions.value.splice(
                    selectedOptions.value.indexOf({
                        id: '1',
                        data: { name: '' },
                    }),
                    1
                )

                loading.value = false
            }, 2000)
        })

        return {
            toggle,
            loading,
            showList,
            selectedOptions,
            removeTag,
            toggleList,
            selectCategory,
            placeholder,
            option,
        }
    },
}
</script>

<style></style>
