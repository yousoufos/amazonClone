<template>
    <div>
        <p>{{ name }}</p>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
    },
    setup(props) {
        console.log(props.name)
        return {}
    },
}
</script>

<style></style>
