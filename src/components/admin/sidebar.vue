<template>
    <div class="flex flex-col w-48 h-screen text-gray-100 bg-gray-700 border-r">
        <div class="flex-grow mx-auto mt-2">
            <ul class="space-y-4">
                <router-link to="/admin/">
                    <li
                        class="flex items-center p-4 text-lg cursor-pointer hover:bg-gray-100 hover:text-yellow-500"
                        :class="[
                            { 'bg-gray-100': selected === 'adminHome' },
                            { 'text-yellow-500': selected === 'adminHome' },
                        ]"
                    >
                        <span class="material-icons"> home </span>
                        <p class="px-2">Home</p>
                    </li>
                </router-link>
                <router-link to="/admin/product/listproduct">
                    <li
                        class="flex items-center p-4 text-lg cursor-pointer hover:bg-gray-100 hover:text-yellow-500"
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
                        class="flex items-center p-4 text-lg cursor-pointer hover:bg-gray-100 hover:text-yellow-500"
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
                        class="flex items-center p-4 text-lg cursor-pointer hover:bg-gray-100 hover:text-yellow-500"
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
                        class="flex items-center p-4 text-lg cursor-pointer hover:bg-gray-100 hover:text-yellow-500"
                        :class="[
                            { 'bg-gray-100': selected === 'Users' },
                            { 'text-yellow-500': selected === 'Users' },
                        ]"
                    >
                        <span class="material-icons"> face</span>
                        <p class="px-2">Users</p>
                    </li>
                </router-link>
                <router-link to="/admin/promotion/listpromotions">
                    <li
                        class="flex items-center p-4 text-lg cursor-pointer hover:bg-gray-100 hover:text-yellow-500"
                        :class="[
                            { 'bg-gray-100': selected === 'Promotion' },
                            { 'text-yellow-500': selected === 'Promotion' },
                        ]"
                    >
                        <span class="material-icons"> request_page</span>
                        <p class="px-2">Promotion</p>
                    </li>
                </router-link>
            </ul>
        </div>
        <div class="mx-auto">
            <ul>
                <router-link to="/admin/settings">
                    <li
                        class="flex items-center p-4 text-lg cursor-pointer hover:bg-gray-100 hover:text-yellow-500"
                        :class="[
                            { 'bg-gray-100': selected === 'Settings' },
                            { 'text-yellow-500': selected === 'Settings' },
                        ]"
                    >
                        <span class="material-icons"> settings</span>
                        <p class="px-2">Settings</p>
                    </li>
                </router-link>
                <router-link to="/">
                    <li
                        class="flex items-center p-4 text-lg cursor-pointer hover:bg-gray-100 hover:text-yellow-500"
                    >
                        <span class="material-icons"> important_devices</span>
                        <p class="px-2">FrontEnd</p>
                    </li>
                </router-link>
                <router-link to="/logout">
                    <li
                        class="flex items-center p-4 text-lg cursor-pointer hover:bg-gray-100 hover:text-yellow-500"
                    >
                        <span class="material-icons"> logout </span>
                        <p class="px-2">LogOut</p>
                    </li>
                </router-link>
            </ul>
        </div>
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
