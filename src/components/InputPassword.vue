<template>
    <div class="flex items-center">
        <input
            :type="prop.type"
            :name="name"
            :id="id"
            :placeholder="placeholder"
            :required="required"
            :autocomplete="autocomplete"
            :value="modelValue"
            :class="class"
            @input="$emit('update:modelValue', $event.target.value)"
        />

        <span
            v-if="prop.type === 'password'"
            class="z-20 -ml-8 text-gray-500 cursor-pointer material-icons"
            @click="toggleType"
        >
            visibility
        </span>
        <span
            v-else
            class="z-20 -ml-8 text-gray-500 cursor-pointer material-icons"
            @click="toggleType"
        >
            visibility_off
        </span>
    </div>
</template>

<script>
import { ref, reactive, watchEffect, watch } from 'vue'
export default {
    props: {
        type: String,
        placeholder: String,
        name: String,
        id: String,
        autocomplete: String,
        required: Boolean,
        class: String,
        modelValue: String,
    },
    setup(props, { emit }) {
        const prop = reactive({
            type: props.type,
        })
        const password = ref('')
        const toggleType = (params) => {
            if (prop.type === 'password') {
                prop.type = 'text'
                setTimeout((params) => {
                    prop.type = 'password'
                }, 2000)
            } else {
                prop.type = 'password'
            }
        }
        const changed = (params) => {
            emit('update:modelValue', params.target.value)
        }
        /* watch(password, (password, oldPassword) => {
            emit('changed', password)
        }) */
        return {
            toggleType,
            prop,
            password,
            changed,
        }
    },
}
</script>

<style></style>
