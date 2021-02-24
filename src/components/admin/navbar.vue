<template>
    <div
        class="bg-gray-700 text-gray-100 font-semibold tracking-wider h-14 width768px widthpx flex"
    >
        <router-link to="/admin"
            ><div class="bg-pink-400 h-full w-48">
                <img
                    class="w-48 max-h-16"
                    src="../../assets/logo1.jpg"
                    alt=""
                /></div
        ></router-link>
        <div class="flex justify-between items-center flex-grow px-2">
            <div>{{ title }}</div>
            <div>
                <ul class="flex space-x-2 text-sm">
                    <li class="px-2 border1">Welcome, {{ user.email }}</li>
                    <router-link to="/"
                        ><li class="px-2 border1">Front End</li></router-link
                    >
                    <router-link to="/logout"
                        ><li class="px-2 border1">SignOut</li></router-link
                    >
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    props: {
        title: String,
    },
    setup() {
        const store = useStore()
        const user = ref(
            computed(() => {
                return store.state.auth.user
            })
        )
        return {
            user,
        }
    },
}
</script>

<style>
.width200px {
    width: 250px;
}
.border1:hover {
    border-style: solid;
    border-width: 1px;
    border-color: white;
}
@media screen and (max-width: 768px) {
    .width768px {
        width: 768px;
    }
}
@media screen and (min-width: 768px) {
    .widthpx {
        margin: 0;
    }
}
</style>
