import { db } from '../firebase'

const getProducts = async function () {
  const products = db.collection('product').limit(4)
  try {
    const snapshot = await products.get()
    return snapshot
  } catch (error) {
    console.log(error)
  }
}

export { getProducts }
