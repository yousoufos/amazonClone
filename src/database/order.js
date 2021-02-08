import { db } from '../firebase'
import { getUserById } from '../database/user'
import moment from 'moment'

const addOrder = async function (order) {
  try {
    await db
      .collection('orders')
      .doc()
      .set({
        userId: order.userId,
        items: order.items,
        date: order.date,
        total: Number(order.total),
        paymentMethod: order.paymentMethod,
        deliveryStatus: order.deliveryStatus,
        paymentStatus: order.paymentStatus,
        deliveryDate: null,
        paymentDate: null
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
                      : null
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
                      : null
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
      paymentDate: payload.paymentDate
    })
  } catch (error) {
    console.log(error)
  }
}
const updateOrderDeliveryStatus = async function (payload) {
  try {
    await db.collection('orders').doc(payload.orderId).update({
      deliveryStatus: payload.deliveryStatus,
      deliveryDate: payload.deliveryDate
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
  updateOrderDeliveryStatus
}
