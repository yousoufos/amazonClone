<template>
    <div
        class="bg-indigo-700 text-gray-100 font-semibold tracking-wider h-14 width768px flex"
    >
        <div class="bg-pink-400 h-full w-48">Logo</div>
        <div class="flex justify-between items-center flex-grow px-2">
            <div>{{ title }}</div>
            <div>
                <ul class="flex space-x-2 text-sm">
                    <li class="px-2">Welcome, Youssef</li>
                    <li class="px-2">SignOut</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
}
</script>

<style>
.width200px {
    width: 250px;
}
@media screen and (max-width: 768px) {
    .width768px {
        width: 768px;
    }
}
</style>
