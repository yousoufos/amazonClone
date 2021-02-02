import { db } from '../firebase'
import { deleteProductCategoryById } from '../database/category'
import algoliasearch from 'algoliasearch'

const ALGOLIA_ID = '3OEKS3T6UL'
const ALGOLIA_ADMIN_KEY = '584a2e38bae8db148d7b08543b399226'
const ALGOLIA_INDEX_NAME = 'product'
const ALGOLIA_SEARCH_KEY = 'b2b674cd94f8f38a157e9f4b5e4367c2'

const getProducts = async function () {
  const products = db.collection('product')
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
const updateAlgolia = async function () {
  const tab = []

  const result = await getProducts()
  result.forEach((doc) => {
    const product = doc.data()
    product.objectID = doc.id
    tab.push(product)
  })
  console.log(tab)
  const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)
  const index = client.initIndex(ALGOLIA_INDEX_NAME)

  await index.saveObjects(tab)
}
const searchProduct = function (payload) {
  const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY)
  const index = client.initIndex('product')

  // Perform an Algolia search:
  // https://www.algolia.com/doc/api-reference/api-methods/search/
  return index.search(payload).then(function (responses) {
    // Response from Algolia:
    // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
    console.log(responses.hits)
  })
}

export {
  getProducts,
  getProductById,
  createProduct,
  getProductCategories,
  removeProduct,
  updateProduct,
  updateProductPictures,
  updateAlgolia,
  searchProduct
}
