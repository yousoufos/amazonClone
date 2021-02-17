<template>
    <transition :name="direction" mode="in-out">
        <div class="absolute inset-0" v-show="visibleSlide === index">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
    props: {
        visibleSlide: Number,
        index: Number,
        direction: String,
    },
    setup(props, { emit }) {
        watchEffect(() => {
            emit('picture', props.visibleSlide)
        })

        return {}
    },
}
</script>

<style>
.left-enter-active {
    animation: leftInAnimation 0.4s ease-in-out;
}
.left-leave-active {
    animation: leftOutAnimation 0.4s ease-in-out;
}

@keyframes leftInAnimation {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}
@keyframes leftOutAnimation {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
}
.right-enter-active {
    animation: rightInAnimation 0.4s ease-in-out;
}
.right-leave-active {
    animation: rightOutAnimation 0.4s ease-in-out;
}

@keyframes rightInAnimation {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}
@keyframes rightOutAnimation {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100%);
    }
}
</style>
