<template>
    <div class="">
        <div>
            <navbar title="Admin Page"></navbar>
        </div>
        <div class="flex">
            <div><sidebar></sidebar></div>
            <div class="w-full">2</div>
        </div>
    </div>
</template>

<script>
import navbar from '../../components/admin/navbar'
import sidebar from '../../components/admin/sidebar'
export default {
    components: {
        navbar,
        sidebar,
    },
}
</script>

<style></style>
