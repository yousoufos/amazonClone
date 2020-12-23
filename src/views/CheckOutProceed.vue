<template>
    <navBar></navBar>
    <div
        class="hidden lg:flex lg:w-4/5 lg:mx-auto lg:mt-10 lg:px-4 lg:relative"
    >
        <cardUser
            :user="user"
            @formCancel="cancel"
            v-if="show"
            class="absolute top-0 left-0 right-0 bottom-0"
        ></cardUser>
        <div class="flex">
            <div class="w-2/3">
                <p class="py-3 text-2xl font-bold border-b-2">
                    Finalize your order
                </p>
                <div class="flex flex-col">
                    <user-order-details
                        :user="user"
                        @modifier="modifier"
                        :show="show"
                    ></user-order-details>
                    <payment-methods
                        @methodSelected="paymentFromEvent"
                    ></payment-methods>
                </div>
            </div>
            <order-summary @valider="valider" :cart="cart"></order-summary>
        </div>
    </div>
    <div>
        <user-order-details :user="user" :show="show"></user-order-details>
    </div>
</template>

<script>
import navbar from '../components/Header'
import cardUser from '../components/CardUserForm'
import ordersummary from '../components/OrderSummary'
import paymentmethod from '../components/PaymentMethods'
import userorderdetails from '../components/UserOrderDetails'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import store from '@/store'
import PaymentMethods from '../components/PaymentMethods.vue'
export default {
    setup() {
        const store = useStore()
        const order = ref(null)
        const show = ref(false)
        const modifier = ref(() => {
            show.value = !show.value
        })
        const cancel = ref(() => {
            show.value = !show.value
        })
        const user = ref(computed(() => store.state.auth.user))
        const cart = ref(computed(() => store.state.cart.cart))
        const payment = ref('')
        const paymentFromEvent = function (event) {
            payment.value = event
        }

        const valider = ref(() => {
            if (payment.value === '') {
                return alert('Veuillez indiquer un moyen de paiment')
            }
            if (
                (user.value.nom ||
                    user.value.prenom ||
                    user.value.telephone ||
                    user.value.adresse) === ''
            ) {
                return alert('Veuillez renseigner vos coordonnees')
            }
            var order = {
                userId: user.value.uid,
                items: cart.value.items,
                paymentMethod: payment.value,
                date: Date.now(),
                total: cart.value.total,
                deliveryStatus: 'pending',
                paymentStatus: 'pending',
            }
            store.dispatch('order/addOrder', order)
        })

        return {
            show,
            modifier,
            user,
            cancel,
            cart,
            valider,
            paymentFromEvent,
        }
    },
    components: {
        navBar: navbar,
        cardUser,
        'order-summary': ordersummary,
        'payment-methods': paymentmethod,
        'user-order-details': userorderdetails,
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch('auth/getUserDetails', store.state.auth.user.uid)
        await store.dispatch('cart/getUserCart', store.state.auth.user.uid)
        if (store.state.cart.cart.items.length > 0) {
            next()
        } else {
            next('/')
        }
    },
}
</script>

<style></style>
