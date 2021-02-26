<template>
    <div class="text-gray-100 bg-gray-700 w-48 border-r h-screen">
        <ul class="space-y-4">
            <router-link to="/admin/product/listproduct">
                <li
                    class="p-4 text-lg flex items-center hover:bg-gray-100 hover:text-yellow-500 cursor-pointer"
                    :class="[
                        { 'bg-gray-100': selected === 'Product' },
                        { 'text-yellow-500': selected === 'Product' },
                    ]"
                >
                    <span class="material-icons"> shopping_cart </span>
                    <p class="px-2">Product</p>
                </li>
            </router-link>
            <router-link to="/admin/orders/listorders">
                <li
                    class="p-4 text-lg flex items-center hover:bg-gray-100 hover:text-yellow-500 cursor-pointer"
                    :class="[
                        { 'bg-gray-100': selected === 'Orders' },
                        { 'text-yellow-500': selected === 'Orders' },
                    ]"
                >
                    <span class="material-icons"> receipt </span>
                    <p class="px-2">Orders</p>
                </li>
            </router-link>
            <router-link to="/admin/category/listcategory">
                <li
                    class="p-4 text-lg flex items-center hover:bg-gray-100 hover:text-yellow-500 cursor-pointer"
                    :class="[
                        { 'bg-gray-100': selected === 'Categories' },
                        { 'text-yellow-500': selected === 'Categories' },
                    ]"
                >
                    <span class="material-icons"> toc </span>
                    <p class="px-2">Categories</p>
                </li>
            </router-link>
            <router-link to="/admin/users/listusers">
                <li
                    class="p-4 text-lg flex items-center hover:bg-gray-100 hover:text-yellow-500 cursor-pointer"
                    :class="[
                        { 'bg-gray-100': selected === 'Users' },
                        { 'text-yellow-500': selected === 'Users' },
                    ]"
                >
                    <span class="material-icons"> face</span>
                    <p class="px-2">Users</p>
                </li>
            </router-link>
            <router-link to="/admin/settings">
                <li
                    class="p-4 text-lg flex items-center hover:bg-gray-100 hover:text-yellow-500 cursor-pointer"
                    :class="[
                        { 'bg-gray-100': selected === 'Settings' },
                        { 'text-yellow-500': selected === 'Settings' },
                    ]"
                >
                    <span class="material-icons"> settings</span>
                    <p class="px-2">Settings</p>
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    props: { selected: String },
}
</script>

<style>
.w {
    width: 200px;
}
</style>
