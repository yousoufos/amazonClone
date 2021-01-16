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

const removeProduct = async function (productId) {
  try {
    await db.collection('product').doc(productId).delete()
    const productCategory = await db
      .collection('productCategory')
      .where('productId', '==', productId)
    productCategory.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete()
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const getProductCategories = async function (productId) {
  const tab = []
  try {
    const productcategory = await db
      .collection('productCategory')
      .where('productId', '==', productId)
      .get()
    productcategory.forEach(function (doc) {
      const obj = { id: doc.id, data: doc.data() }
      db.collection('category')
        .doc(obj.data.categoryId)
        .get()
        .then(function (query) {
          if (query.exists) {
            tab.push({ id: query.id, data: query.data() })
          }
        })
    })
    return tab
  } catch (error) {
    console.log(error)
  }
}
export {
  getProducts,
  getProductById,
  createProduct,
  getProductCategories,
  removeProduct
}
