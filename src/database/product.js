import { db } from '../firebase'
import firebase from 'firebase/app'
import { deleteProductCategoryById } from '../database/category'
import algoliasearch from 'algoliasearch'

const ALGOLIA_ID = process.env.VUE_APP_ALGOLIA_ID
const ALGOLIA_ADMIN_KEY = process.env.VUE_APP_ALGOLIA_ADMIN_KEY
const ALGOLIA_INDEX_NAME = process.env.VUE_APP_ALGOLIA_INDEX_NAME
const ALGOLIA_SEARCH_KEY = process.env.VUE_APP_ALGOLIA_SEARCH_KEY

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
            const obj = { ...doc.data(), id: doc.id }
            const query = await db
                .collection('category')
                .doc(obj.categoryId)
                .get()
            if (query.exists) {
                tab.push({ ...query.data(), id: query.id })
            }
        }
        return tab
    } catch (error) {
        console.log(error)
    }
}
const getCategorieProduct = async function (categoryId) {
    const tab = []
    try {
        const categoryProduct = await db
            .collection('productCategory')
            .where('categoryId', '==', categoryId)
            .get()

        for (const doc of categoryProduct.docs) {
            const obj = { ...doc.data(), id: doc.id }
            const query = await db
                .collection('product')
                .doc(obj.productId)
                .get()
            if (query.exists) {
                tab.push({ ...query.data(), productId: query.id })
            }
        }
        return tab
    } catch (error) {
        console.log(error)
    }
}
const updateProduct = async function (productId, productCategory, product) {
    try {
        await deleteProductCategoryById(productId)
        await db
            .collection('product')
            .doc(productId)
            .update({
                title: product.title,
                description: product.description,
                defaultPicture: product.defaultPicture,
                price: Number(product.price),
                stock: Number(product.stock),
                pictures: product.pictures,
            })

        await addProductCategory(productCategory)
    } catch (error) {
        console.log(error)
    }
}
const updateProductStock = async function (payload) {
    try {
        await db
            .collection('product')
            .doc(payload.productId)
            .update({
                stock: Number(payload.stock),
            })
    } catch (error) {
        console.log(error)
    }
}
const updateProductPromotion = async function (payload) {
    try {
        await db.collection('product').doc(payload.productId).update({
            promotion: payload.promotion,
        })
    } catch (error) {
        console.log(error)
    }
}
const updateProductRating = async function (payload) {
    try {
        await db
            .collection('product')
            .doc(payload.productId)
            .update({
                rating: Number(payload.rating),
                reviewNumber: firebase.firestore.FieldValue.increment(1),
            })
    } catch (error) {
        console.log(error)
    }
}
const updateProductPictures = async function (payload) {
    try {
        await db.collection('product').doc(payload.productId).update({
            defaultPicture: payload.defaultPicture,
            pictures: payload.pictures,
        })
    } catch (error) {
        console.log(error)
    }
}
const updateAlgolia = async function () {
    const tab = []

    const result = await getProducts()
    for (const doc of result.docs) {
        const product = doc.data()
        product.objectID = doc.id
        product.categories = await getProductCategories(doc.id)
        tab.push(product)
    }

    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)
    const index = client.initIndex(ALGOLIA_INDEX_NAME)

    await index.saveObjects(tab)
}
const searchProduct = async function (payload) {
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY)
    const index = client.initIndex(ALGOLIA_INDEX_NAME)

    // Perform an Algolia search:
    // https://www.algolia.com/doc/api-reference/api-methods/search/
    const responses = await index.search(payload)
    return responses.hits
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
    searchProduct,
    updateProductStock,
    updateProductRating,
    getCategorieProduct,
    updateProductPromotion,
}
