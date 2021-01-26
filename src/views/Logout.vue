<template></template>

<script>
export default {
    created() {
        console.log('logout')
        this.$store.dispatch('auth/logout')
    },
}
</script>

<style></style>
