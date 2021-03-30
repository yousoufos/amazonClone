<template>
    <div class="w-1/2 mx-auto">
        <div class="flex flex-col">
            <div class="flex justify-center border-b-2 border-black">
                <img :src="require('@/assets/logoSvg.svg')" alt="" />
            </div>
            <div class="flex flex-col text-gray-700 uppercase">
                <p class="text-xl text-center">Hello Youssef Benmosbah</p>
                <p class="text-center">thank you for your visit!</p>
            </div>
            <div class="flex flex-col p-2 space-y-2 bg-gray-100">
                <p class="border-b-2 border-black">COMMAND DETAILS</p>
                <span class="flex"
                    ><p class="text-sm">Command:</p>
                    <p class="text-sm text-gray-700">qsdfkjdmkjqsdqs</p></span
                >
                <span class="flex text-sm"
                    ><p class="">Date :</p>
                    <p class="text-gray-700">30/03/2021</p></span
                >
                <span class="flex text-sm"
                    ><p class="">Payment:</p>
                    <p class="text-gray-700">on delivery</p></span
                >
            </div>
            <div class="mt-4">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                                Reference
                            </th>

                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                                Product
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                                Quantity
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        class="bg-white divide-y divide-gray-200 cursor-pointer"
                    >
                        <td
                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                        >
                            45454554
                        </td>
                        <td
                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                        >
                            45454554
                        </td>
                    </tbody>
                </table>
                <div class="flex flex-col">
                    <div class="flex w-full bg-gray-100 border border-gray-200">
                        <div class="w-10/12 px-2 border-r border-gray-200">
                            <p class="text-right">Produis</p>
                        </div>
                        <div class="w-2/12">
                            <p class="text-center">1254</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    components: {},
    setup() {
        const store = useStore()

        return {}
    },
}
</script>
<style></style>
