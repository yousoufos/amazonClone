import { db } from '../firebase'

const addOrder = async function (order) {
  try {
    await db.collection('orders').doc().set({
      userId: order.userId,
      items: order.items,
      date: order.date,
      total: order.total,
      paymentMethod: order.paymentMethod,
      deliveryStatus: order.deliveryStatus,
      paymentStatus: order.paymentStatus
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
        date: new Date(doc.data().date).toISOString(),
        paymentMethod: doc.data().paymentMethod,
        total: doc.data().total,
        items: doc.data().items,
        deliveryStatus: doc.data().deliveryStatus,
        paymentStatus: doc.data().paymentStatus
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

export { addOrder, getOrder, getOrderById }
