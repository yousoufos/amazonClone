<template>
    <div
        class="fixed bottom-10 left-10 rounded-lg z-50 flex items-center space-x-1"
        :class="[
            { 'bg-green-400': notification.type === 'success' },
            { 'bg-red-500': notification.type === 'error' },
        ]"
    >
        <!-- <div class="w-full flex justify-end">
            <button @click="hide">
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
                </svg>
            </button>
        </div> -->
        <p class="text-gray-100 font-semibold p-4">
            {{ notification.message }}
        </p>
        <span
            @click="hide"
            class="material-icons -ml-8 cursor-pointer text-white font-semibold"
        >
            clear
        </span>
    </div>
</template>

<script>
export default {
    props: { notification: Object },
    setup(props) {},
    data() {
        return {}
    },
    methods: {
        hide() {
            this.$store.dispatch('notification/setNotification', {
                message: '',
                type: '',
                show: false,
            })
        },
    },
}
</script>

<style></style>
