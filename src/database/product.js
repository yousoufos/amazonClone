import { db } from '../firebase'
import { deleteProductCategoryById } from '../database/category'

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
    for (const element of payload.categories) {
      await db
        .collection('productCategory')
        .doc()
        .set({ productId: payload.productId, categoryId: element.id })
    }
  } catch (error) {
    console.log(error)
  }
}

const removeProduct = async function (productId) {
  try {
    await db.collection('product').doc(productId).delete()
    deleteProductCategoryById(productId)
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

    for (const doc of productcategory.docs) {
      const obj = { id: doc.id, data: doc.data() }
      const query = await db
        .collection('category')
        .doc(obj.data.categoryId)
        .get()
      if (query.exists) {
        tab.push({ id: query.id, data: query.data() })
      }
    }
    return tab
  } catch (error) {
    console.log(error)
  }
}
const updateProduct = async function (productId, productCategory, product) {
  console.log(product.pictures)
  try {
    await deleteProductCategoryById(productId)
    await db.collection('product').doc(productId).update({
      title: product.title,
      description: product.description,
      defaultPicture: product.defaultPicture,
      price: product.price,
      stock: product.stock,
      pictures: product.pictures
    })

    await addProductCategory(productCategory)
  } catch (error) {
    console.log(error)
  }
}
const updateProductPictures = async function (payload) {
  console.log(payload)
  try {
    await db.collection('product').doc(payload.productId).update({
      defaultPicture: payload.defaultPicture,
      pictures: payload.pictures
    })
  } catch (error) {
    console.log(error)
  }
}

export {
  getProducts,
  getProductById,
  createProduct,
  getProductCategories,
  removeProduct,
  updateProduct,
  updateProductPictures
}
