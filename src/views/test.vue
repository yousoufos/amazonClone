<template>
    <div>
        <p>{{ count }}</p>
        <p>
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </p>
        <small> Check out your cookies to see the updates. </small>
    </div>
    <div>
        <p>{{ test }}</p>
    </div>
</template>

<script>
export default {
    computed: {
        count() {
            return this.$store.state.count
        },
        test() {
            return this.$store.state.navigation.test
        },
    },
    methods: {
        increment() {
            this.$store.commit('increment')
            this.$store.commit('navigation/increment')
        },
        decrement() {
            this.$store.commit('decrement')
            this.$store.commit('navigation/decrement')
        },
    },
}
</script>

<style></style>
