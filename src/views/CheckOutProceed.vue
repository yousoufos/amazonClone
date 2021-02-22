<template>
    <div
        class="hidden lg:flex lg:w-4/5 lg:mx-auto lg:mt-10 lg:px-4 lg:relative"
    >
        <cardUser
            :user="user"
            @formCancel="cancel"
            v-if="show"
            class="absolute top-0 left-0 right-0 bottom-0"
        ></cardUser>
        <div class="flex w-full">
            <div @click="deleting" v-if="from.length > 0">
                <router-link :to="from[from.length - 1]"
                    ><span class="material-icons text-4xl">
                        keyboard_backspace
                    </span></router-link
                >
            </div>
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
    <div class="flex lg:hidden">
        <cardUser
            class="w-full"
            v-if="show === true"
            :user="user"
            @formCancel="cancel"
        ></cardUser>

        <div class="w-full" v-else>
            <div @click="deleting" class="p-2" v-if="from.length > 0">
                <router-link :to="from[from.length - 1]"
                    ><span class="material-icons text-4xl">
                        keyboard_backspace
                    </span></router-link
                >
            </div>
            <user-order-details
                @modifier="modifier"
                :user="user"
                :show="show"
            ></user-order-details>
            <payment-methods
                class="py-2"
                @methodSelected="paymentFromEvent"
            ></payment-methods>
            <div class="p-4 bg-gray-200 flex flex-col w-full">
                <div
                    class="flex flex-col border-t border-b border-gray-400 py-2"
                >
                    <div
                        class="flex justify-between text-sm font-medium text-black"
                    >
                        <span class="px-4">Sous-total : </span>
                        <span class="px-4">{{ currency.$t(cart.total) }}</span>
                    </div>
                    <div
                        class="flex justify-between text-sm font-medium text-black"
                    >
                        <span class="px-4">Frais de livraison : </span>
                        <span class="px-4">{{ currency.$t(5) }}</span>
                    </div>
                </div>
                <div class="flex justify-between p-4">
                    <span class="font-semibold text-lg">Total : </span>
                    <span class="font-bold text-lg text-yellow-500">{{
                        currency.$t(Number(cart.total) + 5)
                    }}</span>
                </div>
                <div class="p-6">
                    <button
                        @click="valider"
                        class="font-semibold bg-yellow-500 rounded-lg h-10 w-full"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cardUser from '../components/CardUserForm'
import ordersummary from '../components/OrderSummary'
import paymentmethod from '../components/PaymentMethods'
import userorderdetails from '../components/UserOrderDetails'
import { useCurrency } from '../plugins/currencyPlugin'
import { ref, computed } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useStore } from 'vuex'
import store from '@/store'
export default {
    setup() {
        const store = useStore()
        const order = ref(null)
        const show = ref(false)
        const currency = useCurrency()
        const modifier = ref(() => {
            show.value = !show.value
        })
        const cancel = ref((elm) => {
            show.value = elm
            console.log(show.value)
        })
        const user = ref(computed(() => store.state.auth.user))
        const cart = ref(computed(() => store.state.cart.cart))
        const stock = computed(() => {
            return store.state.product.product
        })
        const payment = ref('')
        const paymentFromEvent = function (event) {
            payment.value = event
        }

        const valider = ref(async () => {
            let tab = []
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
                userId: user.value.userId,
                items: cart.value.items,
                paymentMethod: payment.value,
                date: Date.now(),
                total: cart.value.total,
                deliveryStatus: 'pending',
                paymentStatus: 'pending',
            }
            for (const item of cart.value.items) {
                await store.dispatch('product/getProductById', item.productId)
                if (stock.value.data.stock >= item.qte) {
                    tab.push({
                        productId: item.productId,
                        stock: stock.value.data.stock - item.qte,
                    })
                } else {
                    return alert(`La quantité du produit ${item.title} n'est pas disponible,
                    veuillez la rectifier`)
                }
            }
            for (const item of tab) {
                await store.dispatch('product/updateProductStock', {
                    productId: item.productId,
                    stock: item.stock,
                })
            }
            store.dispatch('order/addOrder', order)
        })
        const from = ref(
            computed((params) => {
                if (typeof store.state.navigation.from === 'undefined') {
                    return []
                } else {
                    return store.state.navigation.from
                }
            })
        )
        const deleting = () => {
            store.commit('navigation/removeFrom')
        }

        return {
            show,
            modifier,
            user,
            cancel,
            cart,
            valider,
            paymentFromEvent,
            currency,
            from,
            deleting,
        }
    },
    components: {
        cardUser,
        'order-summary': ordersummary,
        'payment-methods': paymentmethod,
        'user-order-details': userorderdetails,
    },
    async beforeRouteEnter(to, from, next) {
        await store.dispatch(
            'auth/getUserDetails',
            store.state.auth.user.userId
        )
        await store.dispatch('cart/getUserCart', store.state.auth.user.userId)
        if (store.state.cart.cart.items.length > 0) {
            next()
        } else {
            next('/')
        }
    },
}
</script>

<style></style>
