<template>
    <div class="text-gray-700 w-48">
        <ul class="space-y-4">
            <router-link to="/admin/product/listproduct">
                <li
                    class="p-4 text-lg flex items-center hover:bg-gray-300 cursor-pointer"
                    :class="{ 'bg-gray-300': selected === 'Product' }"
                >
                    <span class="material-icons"> shopping_cart </span>
                    <p class="px-2">Product</p>
                </li>
            </router-link>
            <router-link to="/admin/orders/listorders">
                <li
                    class="p-4 text-lg flex items-center hover:bg-gray-300 cursor-pointer"
                    :class="{ 'bg-gray-300': selected === 'Orders' }"
                >
                    <span class="material-icons"> receipt </span>
                    <p class="px-2">Orders</p>
                </li>
            </router-link>
            <router-link to="/admin/category/listcategory">
                <li
                    class="p-4 text-lg flex items-center hover:bg-gray-300 cursor-pointer"
                    :class="{ 'bg-gray-300': selected === 'Categories' }"
                >
                    <span class="material-icons"> toc </span>
                    <p class="px-2">Categories</p>
                </li>
            </router-link>
            <router-link to="/admin/users/listusers">
                <li
                    class="p-4 text-lg flex items-center hover:bg-gray-300 cursor-pointer"
                    :class="{ 'bg-gray-300': selected === 'Users' }"
                >
                    <span class="material-icons"> face</span>
                    <p class="px-2">Users</p>
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
