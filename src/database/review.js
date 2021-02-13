import { db } from '../firebase'

const addReview = async function (payload) {
  try {
    await db.collection('reviews').doc().set({
      productId: payload.productId,
      userId: payload.userId,
      message: payload.message,
      title: payload.title,
      rating: payload.rating,
      date: new Date()
    })
  } catch (error) {
    console.log(error)
  }
}
const getProductReviews = async function (payload) {
  try {
    const result = await db
      .collection('reviews')
      .where('productId', '==', payload.productId)
      .get()
    return result
  } catch (error) {
    console.log(error)
  }
}
const getUserReviews = async function (payload) {
  try {
    const result = await db
      .collection('reviews')
      .where('userId', '==', payload.userId)
      .get()
    return result
  } catch (error) {
    console.log(error)
  }
}
export { addReview, getProductReviews, getUserReviews }
