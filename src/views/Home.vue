<template>
    <navBar></navBar>
    <div>
        <div>
            <img
                class="xl:w-full xl:z-0 xl:-mb-28 gradient"
                src="../assets/banniere.jpg"
                alt=""
            />
        </div>
        <div><product></product></div>
    </div>
</template>
<script>
import navBar from '../components/Header'
import product from '../components/Product'
export default {
    components: {
        navBar,
        product,
    },
}
</script>
<style scoped>
.gradient {
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
</style>
