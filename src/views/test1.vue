<template>
    <div class="w-full mx-auto">
        <div
            class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
            <div class="flex flex-wrap">
                <div
                    v-for="item in selectedOptions"
                    :key="item.id"
                    class="flex bg-green-400 rounded-lg p-1 m-2"
                >
                    <span>{{ item.name }}</span
                    ><span @click="removeTag(item)"
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
            class="bg-white mt-1 rounded-sm h-24 overflow-auto px-4"
        >
            <ul>
                <li
                    @click="selectCategory(option)"
                    class="py-1 cursor-default"
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
export default {
    props: {
        category: Object,
    },
    data() {
        return {
            showList: false,
            options: [
                { id: 1, name: 'Informatique' },
                { id: 2, name: 'Telephone' },
                { id: 3, name: 'Inprimante' },
                { id: 4, name: 'Console' },
                { id: 5, name: 'Voiture' },
            ],
            selectedOptions: [],
        }
    },
    methods: {
        removeTag(item) {
            this.selectedOptions.splice(this.selectedOptions.indexOf(item), 1)
        },
        toggleList() {
            this.showList = !this.showList
        },
        selectCategory(item) {
            if (this.selectedOptions.indexOf(item) === -1)
                this.selectedOptions.push(item)
        },
    },
}
</script>

<style></style>
