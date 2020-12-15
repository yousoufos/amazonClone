import { db } from '../firebase'
import firebase from 'firebase/app'

const updateItemsCart = function (userId, payload) {
  db.collection('users')
    .doc(userId)
    .update({
      cart: { items: payload.oldItems },
      total: payload.total
    })
    .then(() => {
      console.log('Update reussi')
    })
    .catch((err) => console.log(err))
}
const deleteAllItemsCart = async function (userId) {
  await db.collection('users').doc(userId).update({
    'cart.items': firebase.firestore.FieldValue.delete()
  })
}

const initializeCart = (userId) => {
  db.collection('users')
    .doc(userId)
    .set({
      cart: { items: [], total: 0, createdAt: Date.now() }
    })
    .then(() => {
      console.log('cart initialized')
    })
    .catch((err) => console.log(err))
}

const getUserCart = function (userId) {
  try {
    const data = db.collection('users').doc(userId).get()
    return data
  } catch (error) {
    console.log(error)
  }
}

const addToCart = function (userId, product, total) {
  db.collection('users')
    .doc(userId)
    .update({
      'cart.items': firebase.firestore.FieldValue.arrayUnion(product),
      total: total
    })
}

export { updateItemsCart, initializeCart, getUserCart, addToCart }
