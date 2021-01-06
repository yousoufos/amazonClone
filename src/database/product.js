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

const getProductById = async function (productId) {
  const product = await db.collection('product').doc(productId).get()
  return product
}

const createProduct = async function (payload) {
  const product = payload.product
  try {
    await addProductCategory(payload.productCategory)
    await payload.ref.set(product)
  } catch (error) {
    console.log(error)
  }
}
const addProductCategory = async function (payload) {
  try {
    payload.categories.forEach((element) => {
      db.collection('productCategory')
        .doc()
        .set({ productId: payload.productId, categoryId: element.id })
    })
  } catch (error) {
    console.log(error)
  }
}
export { getProducts, getProductById, createProduct }
