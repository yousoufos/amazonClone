<template>
    <div>
        <div>
            <label for="email">Email</label>
            <input v-model="email" type="text" id="email" />
        </div>
        <div>
            <label for="content">content</label>
            <textarea
                v-model="content"
                name="content"
                id="content"
                cols="30"
                rows="10"
            ></textarea>
        </div>
        <div>
            <button @click="send">Send</button>
        </div>
    </div>
    <div style="display: flex; flex-direction: column">
        <span
            style="
                font-size: 1.125rem;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
            "
            >You have new order 254dfsdf155sd</span
        >
        <span
            style="
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                order-bottom-width: 1px;
            "
            >Order Info :
        </span>
        <div>
            <p>Iphone 12</p>
        </div>
    </div>
</template>

<script>
import emailjs from 'emailjs-com'
export default {
    data() {
        return {
            content: '',
            email: '',
        }
    },
    methods: {
        send() {
            var param = {
                email: this.email,
                content: this.content,
            }
            emailjs
                .send(
                    'service_ifwkdjn',
                    'template_cer57w1',
                    param,
                    'user_msHBHODX8sqjYLXVJjNY5'
                )
                .then(
                    (result) => {
                        console.log('SUCCESS!', result.status, result.text)
                    },
                    (error) => {
                        console.log('FAILED...', error)
                    }
                )
        },
    },
}
</script>

<style></style>
