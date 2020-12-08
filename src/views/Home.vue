<template>
    <navBar></navBar>
    <div class="max-w-screen-xl mx-auto bg-gray-100">
        <div class="hidden xl:flex">
            <img
                class="xl:w-full xl:z-0 xl:-mb-15 gradient"
                src="../assets/banniere.jpg"
                alt=""
            />
        </div>
        <div class="flex flex-col xl:flex xl:flex-row">
            <product
                title="Iphone 12"
                :price="1500"
                description="Lorem Ipsum is simply dummy text of the printing ."
                picture="iphone12.jpg"
                :rating="3"
            ></product>
            <product
                title="Imprimante Multifonction"
                :price="1500"
                description="Lorem Ipsum is simply dummy text of the printing."
                picture="imprimate.jpg"
                :rating="5"
            ></product>
            <product
                title="Clavier mecanique"
                :price="1500"
                description="Lorem Ipsum is simply dummy text of the printing.."
                picture="clavier.jpg"
                :rating="1"
            ></product>
        </div>
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
