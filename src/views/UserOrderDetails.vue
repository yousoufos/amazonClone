<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <transition name="slide-fade">
                <div>
                    <div v-if="order.error === 'forbiden'">
                        Forbidden access
                    </div>
                    <div
                        v-else
                        class="flex flex-col bg-gray-200 lg:w-1/2 lg:mx-auto lg:mt-2"
                    >
                        <div @click="deleting" v-if="from.length > 0">
                            <router-link :to="from[from.length - 1]"
                                ><span class="text-4xl material-icons">
                                    keyboard_backspace
                                </span></router-link
                            >
                        </div>
                        <div
                            class="hidden lg:flex lg:text-base lg:font-semibold lg:p-2"
                        >
                            Your Order Details
                        </div>
                        <div class="p-2 my-2 text-sm tracking-wide bg-white">
                            <p class="font-semibold">
                                Order N°: {{ order.orderId }}
                            </p>
                            <p class="text-gray-800">
                                Created At: {{ order.date }}
                            </p>
                            <p class="text-gray-800">
                                Total: {{ currency.$t(order.total) }}
                            </p>
                            <p
                                v-if="order.paymentDate != null"
                                class="text-gray-800"
                            >
                                Payment Date: {{ order.paymentDate }}
                            </p>
                        </div>
                        <div>
                            <div class="p-2 text-gray-800">
                                <p>Your articles</p>
                            </div>
                            <div class="space-y-2">
                                <div
                                    v-for="item in order.items"
                                    :key="item.productId"
                                    class="p-4 mx-2 bg-white rounded-md"
                                >
                                    <div class="space-y-2 text-sm border-b">
                                        <span
                                            class="p-1 text-gray-100"
                                            :class="
                                                order.deliveryStatus ===
                                                'pending'
                                                    ? 'bg-red-400'
                                                    : 'bg-green-500'
                                            "
                                            >{{ order.deliveryStatus }}</span
                                        >
                                        <p>
                                            {{
                                                order.deliveryDate != null
                                                    ? order.deliveryDate
                                                    : ''
                                            }}
                                        </p>
                                    </div>
                                    <div class="flex p-2">
                                        <div>
                                            <img
                                                class="w-20 h-20 lg:w-40 lg:h-40"
                                                :src="
                                                    item.defaultPicture === ''
                                                        ? require('../assets/no-image.jpg')
                                                        : item.defaultPicture
                                                "
                                                alt=""
                                            />
                                        </div>
                                        <div class="px-2 space-y-2 text-sm">
                                            <p>{{ item.title }}</p>
                                            <p>Qte: {{ item.qte }}</p>
                                            <p class="font-semibold">
                                                {{ currency.$t(item.price) }}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        v-if="
                                            order.deliveryStatus === 'Delivered'
                                        "
                                    >
                                        <div class="p-2 text-gray-800 border-b">
                                            <p>Review</p>
                                        </div>
                                        <div
                                            class="p-4 mx-2 bg-white rounded-md"
                                        >
                                            <div v-if="reviewProduct(item)">
                                                <div class="flex flex-col">
                                                    <div
                                                        class="flex flex-col space-y-2"
                                                    >
                                                        <input
                                                            v-model="
                                                                title[
                                                                    item
                                                                        .productId
                                                                ]
                                                            "
                                                            type="text"
                                                            placeholder="Un titre ici"
                                                            class="rounded-md"
                                                        />
                                                        <textarea
                                                            v-model="
                                                                message[
                                                                    item
                                                                        .productId
                                                                ]
                                                            "
                                                            name=""
                                                            id=""
                                                            cols="30"
                                                            rows="3"
                                                            placeholder="Evaluez le produit"
                                                            class="rounded-md"
                                                        ></textarea>
                                                    </div>
                                                    <div>
                                                        <span
                                                            @click="
                                                                showIndex(index)
                                                            "
                                                            @mouseenter="
                                                                showIndex(index)
                                                            "
                                                            v-for="(
                                                                n, index
                                                            ) in 5"
                                                            :key="index"
                                                            class="text-gray-500 cursor-pointer material-icons"
                                                            :class="{
                                                                'text-yellow-500':
                                                                    index <=
                                                                    clickedIndex,
                                                            }"
                                                        >
                                                            grade
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    @click="addReview(item)"
                                                    class="px-2 bg-yellow-500 rounded-md"
                                                >
                                                    Add a review
                                                </button>
                                            </div>
                                            <div v-else>
                                                <div
                                                    class="flex justify-between"
                                                >
                                                    <div class="flex space-x-1">
                                                        <span
                                                            v-for="(
                                                                n, index
                                                            ) in 5"
                                                            :key="index"
                                                            class="text-sm text-gray-500 material-icons"
                                                            :class="{
                                                                'text-yellow-500':
                                                                    index <=
                                                                    review[
                                                                        item
                                                                            .productId
                                                                    ].rating,
                                                            }"
                                                            >grade</span
                                                        >
                                                        <span class="text-sm">{{
                                                            review[
                                                                item.productId
                                                            ].rating + '/5'
                                                        }}</span>
                                                    </div>
                                                    <div>
                                                        <p class="text-sm">
                                                            {{
                                                                review[
                                                                    item
                                                                        .productId
                                                                ].date
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="p-2 text-sm">
                                                    <p class="font-semibold">
                                                        {{
                                                            review[
                                                                item.productId
                                                            ].title
                                                        }}
                                                    </p>
                                                    <p class="text-gray-900">
                                                        {{
                                                            review[
                                                                item.productId
                                                            ].message
                                                        }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="p-2 text-gray-800">
                                <p>Payment</p>
                            </div>
                            <div class="p-4 mx-2 bg-white rounded-md">
                                <div class="space-y-1 border-b">
                                    <span class="text-xs font-semibold"
                                        >Payment Method:</span
                                    >
                                    <p class="text-xs text-gray-500">
                                        {{ order.paymentMethod }}
                                    </p>
                                </div>
                                <div class="flex flex-col py-2 space-y-1">
                                    <span class="text-xs font-semibold"
                                        >Payment Details:</span
                                    >
                                    <div class="flex">
                                        <span class="text-xs text-gray-500"
                                            >Total articles :
                                        </span>
                                        <span class="ml-2 text-xs">{{
                                            currency.$t(order.total)
                                        }}</span>
                                    </div>
                                    <div class="flex">
                                        <span class="text-xs text-gray-500"
                                            >Delevery :
                                        </span>
                                        <span class="ml-2 text-xs">{{
                                            currency.$t(8)
                                        }}</span>
                                    </div>
                                    <div class="flex py-2">
                                        <span class="text-xs text-gray-500"
                                            >Total :
                                        </span>
                                        <span class="ml-2 text-xs">{{
                                            currency.$t(order.total)
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useCurrency } from '../plugins/currencyPlugin'
export default {
    setup() {
        const store = useStore()
        const route = useRoute()
        const currency = useCurrency()
        const loading = ref(true)
        const toggleReviewForm = ref(true)
        const clickedIndex = ref()
        const title = ref([])
        const message = ref([])
        const order = computed(() => {
            return store.state.order.order
        })

        const product = ref(
            computed(() => {
                return store.state.product.product
            })
        )
        const review = ref([])
        /* const review = computed(() => {
            if (
                store.state.review.userReviews.length > 0 &&
                typeof item !== 'undefined'
            ){
                var r= store.state.review.userReviews.find((product) => {
                    return product.productId === item.productId
                })
                if (typeof r !== 'undefined') {
                    return r
                } else {
                    return null
                }
            }else{
                return null
            }

        }) */
        var i = 0
        const reviewProduct = (item) => {
            if (
                store.state.review.userReviews.length > 0 &&
                typeof item !== 'undefined'
            ) {
                var r = store.state.review.userReviews.find((product) => {
                    return product.productId === item.productId
                })

                if (typeof r !== 'undefined') {
                    if (i === 0) {
                        review.value[item.productId] = r
                    }

                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        }

        const addReview = async (item) => {
            if (
                title.value[item.productId] !== '' &&
                clickedIndex !== 'undefined'
            ) {
                var Review = {
                    productId: item.productId,
                    userId: order.value.userId,
                    message: message.value[item.productId],
                    title: title.value[item.productId],
                    rating: Number(clickedIndex.value + 1),
                }

                try {
                    await store.dispatch('review/addReview', Review)
                    await store.dispatch(
                        'product/getProductById',
                        item.productId
                    )
                    console.log(product.value)
                    await store.dispatch('product/updateProductRating', {
                        productId: item.productId,
                        rating:
                            product.value.rating +
                            Number(clickedIndex.value + 1),
                    })

                    review.value[item.productId] = Review
                } catch (error) {
                    console.log(error)
                }
            } else {
                return alert('Titre ou evaluation non renseigner')
            }
        }
        const submit = ref((params) => {
            toggleReviewForm.value = true
        })
        const showIndex = (index) => {
            clickedIndex.value = index
        }
        const deleting = (params) => {
            store.commit('navigation/removeFrom')
        }
        const from = computed((params) => {
            if (typeof store.state.navigation.from === 'undefined') {
                return []
            } else {
                return store.state.navigation.from
            }
        })

        onMounted(async (params) => {
            await store.dispatch('order/getOrderById', route.query.orderId)
            await store.dispatch('review/getUserReviews', {
                userId: order.value.userId,
            })

            loading.value = false
        })
        return {
            order,
            loading,
            review,
            toggleReviewForm,
            addReview,
            submit,
            showIndex,
            clickedIndex,
            message,
            title,
            product,
            currency,
            reviewProduct,
            from,
            deleting,
        }
    },
}
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave {
}
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
