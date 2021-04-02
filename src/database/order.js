import { db } from '../firebase'
import { getUserById } from '../database/user'
import moment from 'moment'

const addOrder = async function (payload) {
    try {
        await payload.ref.set({
            userId: payload.order.userId,
            items: payload.order.items,
            date: payload.order.date,
            total: Number(payload.order.total),
            paymentMethod: payload.order.paymentMethod,
            deliveryStatus: payload.order.deliveryStatus,
            paymentStatus: payload.order.paymentStatus,
            deliveryDate: null,
            paymentDate: null,
            deliveryPrice: Number(payload.deliveryPrice),
        })
    } catch (error) {
        console.log(error)
    }
}

const getOrder = async function (userId) {
    try {
        const querySnapshot = await db
            .collection('orders')
            .where('userId', '==', userId)
            .get()
        const tab = []
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            const order = {
                orderId: doc.id,
                userId: doc.data().userId,
                date: moment(doc.data().date).format('LL'),
                paymentMethod: doc.data().paymentMethod,
                total: Number(doc.data().total),
                deliveryPrice: Number(doc.data().deliveryPrice),
                items: doc.data().items,
                deliveryStatus: doc.data().deliveryStatus,
                paymentStatus: doc.data().paymentStatus,
                deliveryDate:
                    doc.data().deliveryDate != null
                        ? moment(doc.data().deliveryDate.toDate()).format('LL')
                        : null,
                paymentDate:
                    doc.data().paymentDate != null
                        ? moment(doc.data().paymentDate.toDate()).format('LL')
                        : null,
            }
            tab.push(order)
        })

        return tab
    } catch (error) {
        console.log(error)
    }
}
const getOrderById = async function (orderId) {
    try {
        const order = await db.collection('orders').doc(orderId).get()

        return order
    } catch (error) {
        console.log(error)
        return { order: { error: 'forbidden' } }
    }
}
const getOrders = async function () {
    try {
        const orders = []
        const result = await db.collection('orders').get()
        for (const order of result.docs) {
            const user = await getUserById(order.data().userId)
            const obj = {
                orderId: order.id,
                user: { id: user.id, data: user.data() },
                date: moment(order.data().date).format('LL'),
                paymentMethod: order.data().paymentMethod,
                total: Number(order.data().total),
                deliveryPrice: Number(order.data().deliveryPrice),
                items: order.data().items,
                deliveryStatus: order.data().deliveryStatus,
                paymentStatus: order.data().paymentStatus,
                deliveryDate:
                    order.data().deliveryDate != null
                        ? moment(order.data().deliveryDate.toDate()).format(
                              'LL'
                          )
                        : null,
                paymentDate:
                    order.data().paymentDate != null
                        ? moment(order.data().paymentDate.toDate()).format('LL')
                        : null,
            }
            orders.push(obj)
        }
        return orders
    } catch (error) {
        console.log(error)
    }
}

const updateOrderPaymentStatus = async function (payload) {
    try {
        await db.collection('orders').doc(payload.orderId).update({
            paymentStatus: payload.paymentStatus,
            paymentDate: payload.paymentDate,
        })
    } catch (error) {
        console.log(error)
    }
}
const updateOrderDeliveryStatus = async function (payload) {
    try {
        await db.collection('orders').doc(payload.orderId).update({
            deliveryStatus: payload.deliveryStatus,
            deliveryDate: payload.deliveryDate,
        })
    } catch (error) {
        console.log(error)
    }
}
const updateOrderItems = async function (payload) {
    try {
        await db.collection('orders').doc(payload.orderId).update({
            items: payload.items,
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    addOrder,
    getOrder,
    getOrderById,
    getOrders,
    updateOrderPaymentStatus,
    updateOrderDeliveryStatus,
    updateOrderItems,
}
