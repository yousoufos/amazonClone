<template>
    <div class="mx-auto lg:w-1/2">
        <div class="flex flex-col mt-4">
            <div class="flex justify-center border-b-2 border-black">
                <img :src="require('@/assets/logoSvg.svg')" alt="" />
            </div>
            <div class="flex flex-col mt-4 text-gray-700 uppercase">
                <p class="text-xl text-center">Hello Youssef Benmosbah</p>
                <p class="text-center">thank you for your visit!</p>
            </div>
            <div class="flex flex-col p-2 mt-4 space-y-2 bg-gray-100">
                <p class="text-xl text-gray-700 border-b-2 border-black">
                    COMMAND DETAILS
                </p>
                <span class="flex"
                    ><p class="text-sm">Command:</p>
                    <p class="px-4 text-gray-700 px-4text-sm">
                        qsdfkjdmkjqsdqs
                    </p></span
                >
                <span class="flex text-sm"
                    ><p class="">Date :</p>
                    <p class="px-4 text-gray-700">30/03/2021</p></span
                >
                <span class="flex text-sm"
                    ><p class="">Payment:</p>
                    <p class="px-4 text-gray-700">on delivery</p></span
                >
            </div>
            <div class="mt-4">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                        class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                    >
                        <div
                            class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
                        >
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
                                    <tr>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                        >
                                            45454554
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500"
                                        >
                                            Clavier mécanique spirit of gamer
                                            XPERT
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                        >
                                            125.000
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                        >
                                            1
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                        >
                                            125.000
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                        >
                                            45454554
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500"
                                        >
                                            Clavier mécanique spirit of gamer
                                            XPERT
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                        >
                                            125.000
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                        >
                                            1
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                                        >
                                            125.000
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col mt-6">
                    <div
                        class="flex w-full p-2 bg-gray-100 border border-gray-200"
                    >
                        <div
                            class="w-10/12 px-2 text-gray-600 border-r border-gray-300"
                        >
                            <p class="text-right">Produis</p>
                        </div>
                        <div class="w-2/12 text-gray-600">
                            <p class="text-center">125.000</p>
                        </div>
                    </div>
                    <div
                        class="flex w-full p-2 bg-gray-100 border border-gray-200"
                    >
                        <div
                            class="w-10/12 px-2 text-gray-600 border-r border-gray-300"
                        >
                            <p class="text-right">Livraison</p>
                        </div>
                        <div class="w-2/12 text-gray-600">
                            <p class="text-center">8.000</p>
                        </div>
                    </div>
                    <div
                        class="flex w-full p-2 bg-gray-100 border border-gray-200"
                    >
                        <div
                            class="w-10/12 px-2 text-gray-600 border-r border-gray-300"
                        >
                            <p class="text-right">Timbre Fiscal</p>
                        </div>
                        <div class="w-2/12 text-gray-600">
                            <p class="text-center">0.600</p>
                        </div>
                    </div>
                    <div
                        class="flex w-full p-2 bg-gray-100 border border-gray-200"
                    >
                        <div
                            class="w-10/12 px-2 text-gray-600 border-r border-gray-300"
                        >
                            <p class="text-right">Totla Payé</p>
                        </div>
                        <div class="w-2/12 text-gray-600">
                            <p class="font-bold text-center">133.600</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col p-2 mt-4 space-y-2 bg-gray-100">
                    <p class="text-xl text-gray-700 border-b-2 border-black">
                        Livraison
                    </p>
                    <span class="flex"
                        ><p class="text-sm">Transporteur:</p>
                        <p class="px-4 text-sm text-gray-700">Aramex</p></span
                    >

                    <span class="flex text-sm"
                        ><p class="">Payment:</p>
                        <p class="px-4 text-gray-700">on delivery</p></span
                    >
                </div>
                <div class="flex p-2 mt-4 space-x-2">
                    <div class="flex flex-col w-1/2 p-2 bg-gray-100">
                        <p
                            class="text-sm text-gray-700 border-b-2 border-black lg:text-xl"
                        >
                            Adresse de livraison
                        </p>
                        <span class="flex">
                            <p class="text-sm text-gray-700">
                                26 rue d'espagne Bizerte 7000
                            </p></span
                        >
                    </div>
                    <div class="flex flex-col w-1/2 p-2 bg-gray-100">
                        <p
                            class="text-sm text-gray-700 border-b-2 border-black lg:text-xl"
                        >
                            Adresse de facturation
                        </p>
                        <span class="flex">
                            <p class="text-sm text-gray-700">
                                26 rue d'espagne Bizerte 7000
                            </p></span
                        >
                    </div>
                </div>
                <div class="mt-4">
                    <button
                        class="w-full p-2 bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none"
                        type="button"
                    >
                        Close
                    </button>
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
